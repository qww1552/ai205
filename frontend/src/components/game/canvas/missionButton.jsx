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
        onIntersectionEnter={() => action('missionInfo/setAdjacentMissionBtn', true)}
        onIntersectionExit={() => action('missionInfo/setAdjacentMissionBtn', false)}
      >
        {/* <mesh position={position}>
          <Box args={[1, 1, 1]}
            material-color={isAdjacentMissionBtn ? "purple" : "lime"}
          />
          <Text fontSize={0.5} position={[0, 0, 1]} color="black" anchorX="center" >
            Mission
          </Text>
        </mesh> */}
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