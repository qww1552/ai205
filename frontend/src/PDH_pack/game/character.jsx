import { OrthographicCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from 'three';
import { useRef } from "react";
import { RigidBody, CuboidCollider  } from "@react-three/rapier";

const Character = () => {

    const [, get] = useKeyboardControls()
    const ref = useRef()

    const frontVector = new Vector3()
    const sideVector = new Vector3()
    const direction = new Vector3()

    const cameraVector = new Vector3();


    useFrame((state) => {
        const { forward, backward, left, right } = get()

        
        frontVector.set(0, forward - backward, 0)
        sideVector.set(left - right, 0, 0)
        
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(5);
        
        
        ref.current.setLinvel({ x: direction.x, y: direction.y, z: 0 })

        state.camera.position.lerp(new Vector3(ref.current.translation().x, ref.current.translation().y, 5), 0.025);

        // cameraVector.addVectors({x:ref.current.translation().x,y:ref.current.translation().y,z:5});

        // state.camera.position.copy(cameraVector)
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