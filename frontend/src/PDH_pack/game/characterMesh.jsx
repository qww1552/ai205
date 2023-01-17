
const CharacterMesh = ({initPosition, initColor}) => {

    return (
        <>
            <mesh position={initPosition}>
                <boxGeometry args={[1,1,0.1]}/>
                <meshStandardMaterial color={initColor}/>
            </mesh>
        </>
    )
}

export default CharacterMesh;