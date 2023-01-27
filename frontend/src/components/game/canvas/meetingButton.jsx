import { Box, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { selectGameInfo } from "app/gameInfo";
import { action } from "app/store";
import { useSelector } from "react-redux";

const MeetingButton = ({ position }) => {
    
    const isAdjacentMeetingBtn = useSelector(selectGameInfo).isAdjacentMeetingBtn;

    return (
        <>
            <RigidBody colliders="cuboid" type="fixed" sensor 
            onIntersectionEnter={() => action('gameInfo/setAdjacentMeetingBtn', true)} 
            onIntersectionExit={() => action('gameInfo/setAdjacentMeetingBtn', false)}
            >
                <mesh position={position}>
                    <Box args={[1, 1, 1]} material-color={isAdjacentMeetingBtn? "purple" : "yellow"} />
                    <Text fontSize={0.5} position={[0, 0, 1]} color="black" anchorX="center" >
                        Meeting
                    </Text>
                </mesh>
            </RigidBody>
        </>
    )
}

export default MeetingButton;