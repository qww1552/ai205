import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Vector2, Vector3, MathUtils } from "three";
import CharacterMesh from "../mesh/characterMesh";

const OtherCharacter = ({ location, initColor, initPosition, id, isAlive }) => {
  const ref = useRef();
  const [nextPos, setNextPos] = useState(new Vector2(0, 0));

  const minusVector = new Vector2();
  // ref.current.charState = "IDLE"
  // ref.current.charDir = "RIGHT"

  useEffect(() => {

    minusVector.subVectors(nextPos, location).normalize();
    
    setNextPos(location);

    if(minusVector.x === 0 && minusVector.y === 0) {
      ref.current.charState = "IDLE"
    } else {
      ref.current.charState = "DASH"
    }

    if(minusVector.x < 0) {
      ref.current.charDir = "RIGHT"
    } else {
      ref.current.charDir = "LEFT"
    }
    
  }, [location]);

  const lerpConst = 0.035;

  useFrame((state) => {
    const pos = ref.current.translation();

    ref.current.setTranslation({
      x: MathUtils.lerp(pos.x, nextPos.x, lerpConst),
      y: MathUtils.lerp(pos.y, nextPos.y, lerpConst),
      z: 0,
    });

    // pos.x = MathUtils.lerp(pos.x, nextPos.x, 0.01)
    // pos.y = MathUtils.lerp(pos.y, nextPos.y, 0.01)
  });

  return (
    <>
      <RigidBody
        colliders={false}
        ref={ref}
        type="dynamic"
        lockRotations={true}
      >
        <CharacterMesh
          initPosition={initPosition}
          initColor={initColor}
          id={id}
          ref={ref}
          isAlive={isAlive}
        />
        <CuboidCollider
          args={[0.5, 0.5, 0.1]}
          sensor
          name={`${id}`}
        />
      </RigidBody>
    </>
  );
};

export default OtherCharacter;
