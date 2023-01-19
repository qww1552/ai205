import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from 'three';
import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { changeLocation } from "app/game"

const MyCharacter = ({ initPosition, initColor }) => {
    const [, get] = useKeyboardControls()
    const ref = useRef()

    const frontVector = new Vector3()
    const sideVector = new Vector3()
    const direction = new Vector3()

    function* sendSequence() {
        let cnt = 0;

        while(true) {

            cnt += 1;
            if(cnt === 60) {
                console.log("야호")
                cnt = 0;
            }

            yield cnt;
        }
    }
    let send = sendSequence();

    useFrame((state) => {

        state.camera.position.lerp(new Vector3(ref.current.translation().x, ref.current.translation().y, 5), 0.1);

        const { forward, backward, left, right } = get()

        frontVector.set(0, forward - backward, 0)
        sideVector.set(left - right, 0, 0)

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(10);

        ref.current.setLinvel({ x: direction.x, y: direction.y, z: 0 })

        // send.next();
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