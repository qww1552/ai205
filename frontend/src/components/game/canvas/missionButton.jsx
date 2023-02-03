import { Box, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
// import { selectMissionInfo } from "app/missionInfo"
import { action } from "app/store";
import { useSelector } from "react-redux";

const MissionButton = ({position}) => {

  // TODO : redux가 완성되면 주석 해제해서 미션 상호작용 작동하도록 하기
  // const isAdjacentMissionBtn = useSelector(selectMissionInfo).isAdjacentMissionBtn

  return (
    <>
      <RigidBody colliders="cuboid" type="fixed" sensor 
        // onIntersectionEnter={() => action('missionInfo/setAdjacentMissionBtn', true)} 
        // onIntersectionExit={() => action('missionInfo/setAdjacentMissionBtn', false)}
      >
        <mesh position={position}>
          <Box args={[1, 1, 1]}
            material-color="grey"
            // material-color={isAdjacentMissionBtn? "grey" : "yellow"}
          />
          <Text fontSize={0.5} position={[0, 0, 1]} color="black" anchorX="center" >
            Mission
          </Text>
        </mesh>
      </RigidBody>
    </>
  );
};

export default MissionButton;