import { Box, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { selectMissionInfo } from "app/missionInfo"
import { action } from "app/store";
import { useSelector } from "react-redux";

const MissionButton = ({ position }) => {

  const isAdjacentMissionBtn = useSelector(selectMissionInfo).isAdjacentMissionBtn

  return (
    <>
      <RigidBody colliders="cuboid" type="fixed" sensor
        onIntersectionEnter={(e) => {
          if(e.colliderObject.name?.search('me_') >= 0) 
            action('missionInfo/setAdjacentMissionBtn', true)
          }}
        onIntersectionExit={(e) => {
          if(e.colliderObject.name?.search('me_') >= 0)
            // console.log('미션버튼') 
            action('missionInfo/setAdjacentMissionBtn', false)
        }}
      >
        <mesh receiveShadow position={position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={isAdjacentMissionBtn ? "purple" : "lime"} />
          <Text fontSize={0.5} position={[0, 0, 1]} color="black" anchorX="center" >
            Mission
          </Text>
        </mesh>
      </RigidBody>
    </>
  );
};

export default MissionButton;