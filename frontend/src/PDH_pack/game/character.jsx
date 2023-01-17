import { OrthographicCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from 'three';
import { useRef } from "react";
import { RigidBody, CuboidCollider  } from "@react-three/rapier";

const Character = ({ lerp = MathUtils.lerp }) => {

    const [, get] = useKeyboardControls()
    const ref = useRef()

    const frontVector = new Vector3()
    const sideVector = new Vector3()
    
    const direction = new Vector3()

    useFrame((state) => {
        const { forward, backward, left, right } = get()

        state.camera.position.set(...ref.current.translation())
        state.camera.position.z = 5;

        frontVector.set(0, forward - backward, 0)
        sideVector.set(left - right, 0, 0)

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(10);


        ref.current.setLinvel({ x: direction.x, y: direction.y, z: 0 })
        // console.log(state.camera.position)
    
    })

    return (
        <>
            <OrthographicCamera>
                <directionalLight color="red" position={[0, 0, 1]} />
                <RigidBody ref={ref} mass={1} colliders={"hull"} type="dynamic" lockRotations={true}>
                    <mesh >
                        <boxGeometry />
                        <meshStandardMaterial />
                    </mesh>
                </RigidBody>
                <CuboidCollider  args={[0.75, 0.5]} />

            </OrthographicCamera>
        </>
    )
}

export default Character;