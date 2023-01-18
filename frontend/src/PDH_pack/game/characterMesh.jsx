import { CuboidCollider } from "@react-three/rapier";

const CharacterMesh = ({initPosition, initColor}) => {

    return (
        <>
            {/* <mesh position={initPosition}>
                <boxGeometry args={[1,1,0.1]}/>
                <CuboidCollider args={[0.5, 0.5, 0.5]}/>
                <meshStandardMaterial color={initColor}/>
            </mesh> */}
        </>
    )
}

export default CharacterMesh;