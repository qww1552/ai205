import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { current } from "@reduxjs/toolkit";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Vector2, MathUtils } from 'three';

const OtherCharacter = ({ initPosition, initColor }) => {

    const ref = useRef();
    const [toggle, setToggle] = useState(true)
    const [nextPos, setNextPos] = useState(new Vector2(2, 0));

    useEffect(() => {
        const timer = setInterval(() => {

            if(toggle) {
                setNextPos(new Vector2(2, 0))
                setToggle(false);
            } else {
                setNextPos(new Vector2(1, -2))
                setToggle(true)
            }

        }, 2000);

        return () => {
            clearInterval(timer);
        };
    }, [toggle]);

    useFrame((state) => {

        const pos = ref.current.position

        // console.log(toggle)

        pos.x = MathUtils.lerp(pos.x, nextPos.x , 0.01)
        pos.y = MathUtils.lerp(pos.y, nextPos.y, 0.01)

    })

    return (
        <>
            <RigidBody colliders={false} type="dynamic" lockRotations={true}>
                <mesh ref={ref} position={initPosition}>
                    <boxGeometry args={[1, 1, 0.1]} />
                    <meshStandardMaterial color={initColor} />
                </mesh>
            </RigidBody>
        </>
    )
}

export default OtherCharacter;