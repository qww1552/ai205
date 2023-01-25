import { Text } from "@react-three/drei";
import { Vector3 } from 'three';

const CharacterMesh = ({initPosition, initColor, name}) => {

    return (
        <>
                <Text fontSize={0.5} position={new Vector3(0,0.2,0)} color="black" anchorX="center" anchorY="top-baseline">
                    {name}
                </Text>
                <mesh position={initPosition}>
                    <boxGeometry args={[1, 1, 0.1]} />
                    <meshStandardMaterial color={initColor} />
                </mesh>
        </>
    )
}

export default CharacterMesh;