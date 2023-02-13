import { useTexture } from "@react-three/drei";
import { Vector3, RepeatWrapping } from "three";
import { Suspense, useEffect, useMemo, useState } from "react";
import data from "./mapData";
import { BallCollider, CuboidCollider, RigidBody, useRapier } from "@react-three/rapier";
import { missionsLocation, walls } from "config/mapObject";

//80 x 60

const width = 80;
const height = 60;

const GameMap = () => {
  // const [obstacles, setObstacles] = useState([]);


  const obstacles = useMemo(() => {
    let result = [];

        // wall data
        data.layers[2].data.forEach((v, i) => {
          if (v > 0) {

            const row = (height - parseInt(i / width)) - (parseInt(height / 2) + 0.5)
            const col = (i % width) - (parseInt(width / 2) - 0.5)

            result = [
              ...result,
              {
                id: "wall",
                row,
                col,
              },
            ]
          }
        });

        // obstacle data
        // data.layers[4].data.forEach((v, i) => {
        //   if (v > 0) {
        //     result = [
        //       ...result,
        //       {
        //         id: "obs",
        //         row: (height - parseInt(i / width)) - (parseInt(height / 2) + 0.5),
        //         col: (i % width) - (parseInt(width / 2) - 0.5),
        //       },
        //     ]
        //   }
        // });

    return result;

  },[data])

  // useEffect(() => {
  //   console.log("fff")

  //   // wall data
  //   data.layers[2].data.forEach((v, i) => {
  //     if (v > 0) {
  //       setObstacles((prev) => [
  //         ...prev,
  //         {
  //           id: "wall",
  //           row: (height - parseInt(i / width)) - (parseInt(height / 2) + 0.5),
  //           col: (i % width) - (parseInt(width / 2) - 0.5),
  //         },
  //       ]);
  //     }


  //   });

  //   //obstacle data
  //   data.layers[4].data.forEach((v, i) => {
  //     if (v > 0) {
  //       setObstacles((prev) => [
  //         ...prev,
  //         {
  //           id: "obs",
  //           row: (height - parseInt(i / width)) - (parseInt(height / 2) + 0.5),
  //           col: (i % width) - (parseInt(width / 2) - 0.5),
  //         },
  //       ]);
  //     }
  //   });

  //   // mission and meeting data index 5


  // }, [data]);

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
        </RigidBody>
      </Suspense>

      {/* 회의 버튼 */}
      <Suspense>
        <RigidBody type="fixed" sensor>
          <BallCollider name="meeting"
            args={[0.5, 0.5, 0.1]}
            position={[5.5, -3.5, 0]}
          />
        </RigidBody>
      </Suspense>

      {/* 미션 오브젝트 */}
      <Suspense>
        <RigidBody type="fixed" sensor>
          {missionsLocation.map((v) => (
            <BallCollider name={`mission_${v.id}`}
              key={`${v.row}_${v.col}_${v.id}${Math.floor(Math.random() * 100)}`}
              args={[0.5, 0.5, 0.1]}
              position={[v.col, v.row, 0]}
            />
          ))}
        </RigidBody>
      </Suspense>



    </>
  );
};

export default GameMap;
