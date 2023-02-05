import { Text, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Vector3 } from "three";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const CharacterMesh = ({ initPosition, initColor, id }) => {

  const texture = useTexture('/player/AnimationSheet_Character.png')
  // const texture = useTexture('/player/players_blue_x1.png')
  texture.repeat.x = 1 / 8;
  texture.repeat.y = 1 / 9;

  texture.offset.y = (1 / 9) * 5

  // texture.offset.x = 0.1;
  // texture.offset.y = 0.2;

  // texture.

  // texture.center.x = 0.5
  // texture.center.y = 0.5
  
  // useEffect(() => {

  //   // console.log(ref.current.map)

  //   // ref.current.map.repeat.x += 1 / 9;
  //   // ref.current.map.repeat.y = 1 / 5;

  //   // ref.current.map.offset.y += 1 / 10;

  // },[])
  const ref = useRef();

  let cnt = 0;
  useFrame(() => {

    cnt += 1;
    if(cnt === 10) {
      ref.current.map.offset.x += 1 / 8;
      cnt = 0;
    }

    if(ref.current.map.offset.x >= 1.0) {
      ref.current.map.offset.x = 0;
    }
  
  })

  return (
    <>
      <Suspense fallback={null}>
        <Text
          fontSize={0.5}
          font="/SeoulHangangM.woff"
          position={new Vector3(0, 0.8, 0)}
          color="black"
          anchorX="center"
          anchorY="top-baseline"
        >
          {id}
        </Text>
      </Suspense>
      <mesh position={initPosition}>
        {/* <boxGeometry args={[1, 1, 0.1]} /> */}
        <planeGeometry args={[1, 1]} attach="geometry" />
        <meshStandardMaterial ref={ref} map={texture} transparent={true}/>
      </mesh>
    </>
  );
};

export default CharacterMesh;
