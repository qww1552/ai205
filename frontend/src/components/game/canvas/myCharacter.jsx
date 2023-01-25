import { useKeyboardControls, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from 'three';
import { useRef, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { changeLocation, selectMe } from "../../../app/me"
import { useDispatch, useSelector } from 'react-redux';
import { action } from "app/store";
import CharacterMesh from "../mesh/characterMesh";


const MyCharacter = ({ initPosition, initColor }) => {

    const me = useSelector(selectMe);
    const [, get] = useKeyboardControls()
    const ref = useRef()
    const dispatch = useDispatch();

    const frontVector = new Vector3()
    const sideVector = new Vector3()
    const direction = new Vector3()


    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(changeLocation({ x: ref.current.translation().x, y: ref.current.translation().y }))
            action("LOCAITION_SEND", { x: ref.current.translation().x, y: ref.current.translation().y })
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

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
                {/* <Text fontSize={0.5} position={new Vector3(0,0.2,0)} color="black" anchorX="center" anchorY="top-baseline">
                    {me.player.name}
                </Text>
                <mesh position={initPosition}>
                    <boxGeometry args={[1, 1, 0.1]} />
                    <meshStandardMaterial color={initColor} />
                </mesh> */}
                <CharacterMesh initPosition={initPosition} initColor={initColor} name={me.player.name}/>
            </RigidBody>
        </>
    )
}

export default MyCharacter;