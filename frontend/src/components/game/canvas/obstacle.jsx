import { RigidBody } from "@react-three/rapier";
import { CuboidCollider  } from "@react-three/rapier";
const Obstacle = () => {

    return (
        <>
            <RigidBody colliders="cuboid" type="fixed">
                <mesh position={[0, 2, 0]}>
                    <boxGeometry args={[2,2,1]}/>
                    <meshStandardMaterial color="green"/>
                </mesh>
            </RigidBody>
        </>
    )
}

export default Obstacle;