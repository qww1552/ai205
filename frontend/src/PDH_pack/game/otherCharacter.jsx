import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Vector2, Vector3, MathUtils } from 'three';
import CharacterMesh from "./characterMesh";

const OtherCharacter = ({ location, initColor, initPosition, name }) => {

    const ref = useRef();
    const [nextPos, setNextPos] = useState(new Vector2(2, 0));

    useEffect(() => {
        setNextPos(new Vector2(location.x, location.y));
    }, [location]);

    useFrame((state) => {

        const pos = ref.current.translation();

        ref.current.setTranslation({ x: MathUtils.lerp(pos.x, nextPos.x, 0.01), y: MathUtils.lerp(pos.y, nextPos.y, 0.01), z: 0 });

        // pos.x = MathUtils.lerp(pos.x, nextPos.x, 0.01)
        // pos.y = MathUtils.lerp(pos.y, nextPos.y, 0.01)
    })

    return (
        <>
            <RigidBody ref={ref} colliders={false} type="dynamic" lockRotations={true}>
                <CharacterMesh initPosition={initPosition} initColor={initColor} name={name}/>
            </RigidBody>
        </>
    )
}

export default OtherCharacter;