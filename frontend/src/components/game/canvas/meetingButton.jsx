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
                onIntersectionEnter={(e) => {
                    if(e.colliderObject.name?.search('me_') >= 0) 
                        action('gameInfo/setAdjacentMeetingBtn', true)
                }}
                onIntersectionExit={(e) => {
                    if(e.colliderObject.name?.search('me_') >= 0) 
                        action('gameInfo/setAdjacentMeetingBtn', false)
                }}
            >
                <mesh receiveShadow position={position}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color={isAdjacentMeetingBtn ? "purple" : "yellow"} />
                    <Text fontSize={0.5} position={[0, 0, 1]} color="black" anchorX="center" >
                        Meeting
                    </Text>
                </mesh>
            </RigidBody>
        </>
    )
}

export default MeetingButton;