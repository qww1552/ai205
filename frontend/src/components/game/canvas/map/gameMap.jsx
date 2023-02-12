import { useTexture } from "@react-three/drei";
import { SideTable } from "./SideTable";
import { Vector3, RepeatWrapping } from "three";
import { useEffect, useMemo, useState } from "react";
import data from "./mapData";
import { BallCollider, CuboidCollider, RigidBody } from "@react-three/rapier";

//80 x 60

const width = 80;
const height = 60;

const GameMap = () => {
  const [obstacles, setObstacles] = useState([]);

  useEffect(() => {
    // wall data
    data.layers[2].data.forEach((v, i) => {
      if (v > 0) {
        setObstacles((prev) => [
          ...prev,
          {
            id: "wall",
            row: (height - parseInt(i / width)) - (parseInt(height / 2) + 0.5),
            col: (i % width) - (parseInt(width / 2) - 0.5),
          },
        ]);
      }

      
    });

    //
    data.layers[4].data.forEach((v, i) => {
      if (v > 0) {
        setObstacles((prev) => [
          ...prev,
          {
            id : "obs",
            row: (height - parseInt(i / width)) - (parseInt(height / 2) + 0.5),
            col: (i % width) - (parseInt(width / 2) - 0.5),
          },
        ]);
      }

      
    });
  }, []);

  const originTexture = useTexture(`/map/mapImage.png`, (texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
  });

  const texture = useMemo(() => originTexture.clone(), [originTexture]);

  return (
    <>
      <mesh renderOrder={-1}>
        <planeGeometry args={[80, 60]} attach="geometry" />
        <meshStandardMaterial map={texture} transparent={true} />
      </mesh>
      <RigidBody type="fixed">
        {obstacles.map((v) => (
          <BallCollider
            key={`${v.row}_${v.col}_${v.id}`}
            args={[0.5, 0.5, 0.1]}
            position={[v.col, v.row, 0]}
          />
        ))}
      </RigidBody>
    </>
  );
};

export default GameMap;
