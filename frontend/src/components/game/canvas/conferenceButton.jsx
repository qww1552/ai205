import { Box, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { action } from "app/store";

const ConfernceButton = ({ position }) => {

    

    return (
        <>

            <RigidBody colliders="cuboid" type="fixed" sensor 
            onIntersectionEnter={() => action('gameInfo/setAdjacentConferBtn', true)} 
            onIntersectionExit={() => action('gameInfo/setAdjacentConferBtn', false)}
            >
                <mesh position={position}>
                    <Box args={[1, 1, 1]} material-color="purple" />
                    <Text fontSize={0.5} position={[0, 0, 1]} color="black" anchorX="center" >
                        conference
                    </Text>
                </mesh>
            </RigidBody>
        </>
    )
}

export default ConfernceButton;