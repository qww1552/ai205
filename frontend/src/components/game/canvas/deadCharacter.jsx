import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import DeadMesh from "../mesh/deadMesh";

const DeadCharacter = ({ position, id }) => {

    const ref = useRef()

    useEffect(() => {
        ref.current.setTranslation({x:position.x,y:position.y,z:0})
    },[])


    return (<>
        <RigidBody ref={ref} colliders={false} type="dynamic" lockRotations={true}>
            <DeadMesh />
            <CuboidCollider
                args={[0.5, 0.5, 0.1]}
                sensor
                name={`dead_${id}`}
            />
        </RigidBody>
    </>)
}

export default DeadCharacter;