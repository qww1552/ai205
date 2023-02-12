import { useTexture } from "@react-three/drei";
import { SideTable } from "./SideTable";
import { Vector3, RepeatWrapping } from "three";
import { useMemo } from "react";


//80 x 60
const GameMap = () => {
  const originTexture = useTexture(
    `/map/mapImage.png`,
    (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
    }
  );

  const texture = useMemo(() => originTexture.clone(), [originTexture]);

  return (
    <>
      <mesh renderOrder={-1}>
        <planeGeometry args={[40, 30]} attach="geometry" />
        <meshStandardMaterial map={texture} transparent={true}/>
      </mesh>
    </>
  );
};

export default GameMap;
