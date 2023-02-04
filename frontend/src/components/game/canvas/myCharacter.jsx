import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useRef, useEffect, useState } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { selectMe } from "../../../app/me";
import { useSelector } from "react-redux";
import { action } from "app/store";
import CharacterMesh from "../mesh/characterMesh";

const MyCharacter = ({ initPosition, initColor }) => {
  const me = useSelector(selectMe);
  const [, get] = useKeyboardControls();
  const ref = useRef();
  const [intersecting, setIntersection] = useState(false);

  const frontVector = new Vector3();
  const sideVector = new Vector3();
  const direction = new Vector3();
  const cameraVec = new Vector3();

  const speed = 6.3;


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
      <RigidBody
        restitution={0}
        ref={ref}
        type="dynamic"
        lockRotations={true}
      >
        <CharacterMesh
          initPosition={initPosition}
          initColor={initColor}
          id={me.player.id}
        />
        <CuboidCollider
          args={[0.5, 0.5, 0.1]}
          sensor
          onIntersectionEnter={(e) => {
            // console.log(e.colliderObject.name ? e.colliderObject.name : null);
          }}
          onIntersectionExit={() => {

          }}
        />
      </RigidBody>
    </>
  );
};

export default MyCharacter;
