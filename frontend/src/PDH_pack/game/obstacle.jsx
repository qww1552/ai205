import { RigidBody } from "@react-three/rapier";
import { CuboidCollider  } from "@react-three/rapier";
const Obstacle = () => {

    return (
        <>
            <RigidBody mass={1} colliders={"hull"} type="fixed">
                <mesh position={[0, 2, 0]}>
                    <boxGeometry args={[2,2,0.05]}/>
                    <meshStandardMaterial />
                </mesh>
                <CuboidCollider args={[0.75, 0.5]} />
            </RigidBody>
        </>
    )
}

export default Obstacle;