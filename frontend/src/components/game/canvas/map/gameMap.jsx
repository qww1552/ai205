import { useTexture } from "@react-three/drei";
import { Vector3, RepeatWrapping } from "three";
import { memo, Suspense, useEffect, useMemo, useState } from "react";
import obstacle from "./mapData";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
} from "@react-three/rapier";
import { missionsLocation, walls } from "config/mapObject";

//80 x 60

const width = 80;
const height = 60;

const GameMap = (() => {

  const obstacles = useMemo(() => {
    let result = [];

    // obstacle data
    obstacle.data.forEach((v, i) => {
      if (v > 0) {
        result = [
          ...result,
          {
            id: "obs",
            row: height - parseInt(i / width) - (parseInt(height / 2) + 0.5),
            col: (i % width) - (parseInt(width / 2) - 0.5),
          },
        ];
      }
    });
    return result;
  }, [obstacle]);

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

      <Suspense>
        <RigidBody colliders="hull" sensor={false} type="fixed">
          {walls.map((v) => (
            <CuboidCollider
              key={`${v.row}_${v.col}`}
              args={[v.width, v.height, 0.1]}
              position={[v.col, v.row, 0]}
            />
          ))}
          {obstacles.map((v) => (
            <CuboidCollider
              key={`${v.row}_${v.col}`}
              args={[0.3, 0.3, 0.1]}
              position={[v.col, v.row, 0]}
            />
          ))}
        </RigidBody>
      </Suspense>

      {/* 회의 버튼 */}
      <Suspense>
        <RigidBody type="fixed" sensor>
          <BallCollider
            name="meeting"
            args={[0.5, 0.5, 0.1]}
            position={[5.5, -3.5, 0]}
          />
        </RigidBody>
      </Suspense>

      {/* 미션 오브젝트 */}
      <Suspense>
        <RigidBody type="fixed" sensor>
          {missionsLocation.map((v) => (
            <BallCollider
              name={`mission_${v.id}`}
              key={`${v.row}_${v.col}_${v.id}${Math.floor(
                Math.random() * 100
              )}`}
              args={[0.5, 0.5, 0.1]}
              position={[v.col, v.row, 0]}
            />
          ))}
        </RigidBody>
      </Suspense>
    </>
  );
});

export default GameMap;
