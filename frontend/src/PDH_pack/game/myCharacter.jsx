import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from 'three';
import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { changeLocation } from "../../app/game"
import { useDispatch } from 'react-redux';

const MyCharacter = ({ initPosition, initColor }) => {
    const [, get] = useKeyboardControls()
    const ref = useRef()
    const dispatch = useDispatch();

    const frontVector = new Vector3()
    const sideVector = new Vector3()
    const direction = new Vector3()

    let cnt = 0;

    useFrame((state) => {

        state.camera.position.lerp(new Vector3(ref.current.translation().x, ref.current.translation().y, 5), 0.1);

        const { forward, backward, left, right } = get()

        frontVector.set(0, forward - backward, 0)
        sideVector.set(left - right, 0, 0)

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(10);

        ref.current.setLinvel({ x: direction.x, y: direction.y, z: 0 })

        if(cnt == 60) {
            dispatch(changeLocation({x: direction.x, y:direction.y}))
            cnt = 0;
        }

        cnt += 1;

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