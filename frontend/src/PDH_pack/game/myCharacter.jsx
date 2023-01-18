import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from 'three';
import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import CharacterMesh from "./characterMesh";

const MyCharacter = ({ initPosition, initColor }) => {
    const [, get] = useKeyboardControls()
    const ref = useRef()

    const frontVector = new Vector3()
    const sideVector = new Vector3()
    const direction = new Vector3()

    useFrame((state) => {

        state.camera.position.lerp(new Vector3(ref.current.translation().x, ref.current.translation().y, 5), 0.1);

        const { forward, backward, left, right } = get()

        frontVector.set(0, forward - backward, 0)
        sideVector.set(left - right, 0, 0)

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(10);

        ref.current.setLinvel({ x: direction.x, y: direction.y, z: 0 })

    })

    return (
        <>
            <RigidBody restitution={0} colliders="cuboid" ref={ref} type="dynamic" lockRotations={true}>
                <mesh position={initPosition}>
                    <boxGeometry args={[1, 1, 0.1]} />
                    <meshStandardMaterial color={initColor} />
                </mesh>
            </RigidBody>
        </>
    )
}

export default MyCharacter;