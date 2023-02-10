import { Line, SpotLight, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useRef, useEffect, useState, Suspense, createRef } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { selectMe } from "../../../app/me";
import { useSelector } from "react-redux";
import { action } from "app/store";
import CharacterMesh from "../mesh/characterMesh";
import { selectGameInfo } from "app/gameInfo";

const MyCharacter = ({color}) => {

  const isInVoteResult = useSelector(selectGameInfo).isInVoteResult;
  const stateMe = useSelector(selectMe);
  const [, get] = useKeyboardControls();
  const ref = useRef();
  const light = useRef();
  const [intersecting, setIntersection] = useState(false);

  const frontVector = new Vector3();
  const sideVector = new Vector3();
  const direction = new Vector3();
  const cameraVec = new Vector3();

  const speed = 6.0;

  // ref.current.charState = "IDLE";
  // ref.current.charDir = "RIGHT";

  useEffect(() => {
    const timer = setInterval(() => {
      action("LOCAITION_SEND_REQUEST", {
        x: ref.current.translation().x,
        y: ref.current.translation().y,
      });
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if(isInVoteResult) {
      ref.current.setTranslation({x:0,y:0,z:0})
    }
  },[isInVoteResult])

  useFrame((state) => {
    state.camera.position.lerp(
      cameraVec.set(
        ref.current.translation().x,
        ref.current.translation().y,
        5
      ),
      0.02
    );


    const { forward, backward, left, right } = get();

    ref.current.charState = forward || backward || left || right ? "DASH" : "IDLE"

    if (left)
      ref.current.charDir = 'LEFT'
    else if (right)
      ref.current.charDir = 'RIGHT'

    frontVector.set(0, forward - backward, 0);
    sideVector.set(left - right, 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed);

    ref.current.setLinvel({ x: direction.x, y: direction.y, z: 0 });

  });

  return (
    <>
      <RigidBody ref={ref} type="dynamic" lockRotations={true}>
        <pointLight distance={4} decay={0.01} position={[0,0,1]}/>

        <Suspense>
          <CharacterMesh
            id={stateMe.player.id}
            ref={ref}
            color={color}
            isAlive={stateMe.player.isAlive}
          />
        </Suspense>

        {stateMe.player.isAlive && <CuboidCollider

          args={[0.5, 0.5, 0.1]}
          sensor
          onIntersectionEnter={(e) => {
            console.log(e.colliderObject.name ? e.colliderObject.name : null);

            if(!e.colliderObject.name) return

            if(e.colliderObject.name?.search('dead_') < 0)
              action("me/setAdjustPlayer", e.colliderObject.name)
            else {
              action('me/setAdjustBody',  e.colliderObject.name)
            }

          }}
          onIntersectionExit={() => {
            action("me/setAdjustPlayer", null)
            action('me/setAdjustBody', null)
          }}
        />}
      </RigidBody>
    </>
  );
};

export default MyCharacter;
