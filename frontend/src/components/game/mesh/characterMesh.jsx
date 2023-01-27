import { Text } from "@react-three/drei";
import { Suspense } from "react";
import { Vector3 } from 'three';

const CharacterMesh = ({ initPosition, initColor, name }) => {

    return (
        <>
            <Suspense fallback={null}>
                <Text fontSize={0.5} font='./SeoulHangangM.woff' position={new Vector3(0, 0.2, 0)} color="black" anchorX="center" anchorY="top-baseline">
                    {name}
                </Text>
            </Suspense>

            <mesh position={initPosition}>
                <boxGeometry args={[1, 1, 0.1]} />
                <meshStandardMaterial color={initColor} />
            </mesh>
        </>
    )
}

export default CharacterMesh;