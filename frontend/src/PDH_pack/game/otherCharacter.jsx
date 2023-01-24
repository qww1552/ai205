import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Vector2, MathUtils } from 'three';

const OtherCharacter = ({ location, initColor, initPosition }) => {

    const ref = useRef();
    const [nextPos, setNextPos] = useState(new Vector2(2, 0));

    useEffect(() => {
        setNextPos(new Vector2(location.x, location.y));
    }, [location]);

    useFrame((state) => {
        const pos = ref.current.position

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