import { Box, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { selectGameInfo } from "app/gameInfo";
import { action } from "app/store";
import { useSelector } from "react-redux";

const ConfernceButton = ({ position }) => {
    
    const isAdjacentConfer = useSelector(selectGameInfo).isAdjacentConfer;

    return (
        <>
            <RigidBody colliders="cuboid" type="fixed" sensor 
            onIntersectionEnter={() => action('gameInfo/setAdjacentConferBtn', true)} 
            onIntersectionExit={() => action('gameInfo/setAdjacentConferBtn', false)}
            >
                <mesh position={position}>
                    <Box args={[1, 1, 1]} material-color={isAdjacentConfer? "purple" : "yellow"} />
                    <Text fontSize={0.5} position={[0, 0, 1]} color="black" anchorX="center" >
                        Conference
                    </Text>
                </mesh>
            </RigidBody>
        </>
    )
}

export default ConfernceButton;