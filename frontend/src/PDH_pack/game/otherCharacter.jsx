import { RigidBody } from "@react-three/rapier";
import CharacterMesh from "./characterMesh";

const OtherCharacter = ({ initPosition, initColor }) => {

    return (
        <>
            <RigidBody colliders={false} type="dynamic" lockRotations={true}>
                <mesh position={initPosition}>
                    <boxGeometry args={[1, 1, 0.1]} />
                    <meshStandardMaterial color={initColor} />
                </mesh>
            </RigidBody>
        </>
    )
}

export default OtherCharacter;