import { RigidBody  } from "@react-three/rapier";
import CharacterMesh from "./characterMesh";

const OtherCharacter = ({initPosition, initColor}) => {

    return (
        <>
            <CharacterMesh initPosition={initPosition} initColor={initColor} />
        </>
    )
}

export default OtherCharacter;