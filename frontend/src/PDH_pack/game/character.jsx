import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from 'three';
import { useRef } from "react";
import { RigidBody, CuboidCollider  } from "@react-three/rapier";

const Character = ({initPosition, initColor}) => {

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
                <RigidBody position={initPosition} ref={ref} mass={1} colliders={"hull"} type="dynamic" lockRotations={true}>
                    <mesh>
                        <boxGeometry args={[1,1,1]}/>
                        <meshStandardMaterial color={initColor}/>
                    </mesh>
                    <CuboidCollider  args={[0.75, 0.5]} />
                </RigidBody>
        </>
    )
}

export default Character;