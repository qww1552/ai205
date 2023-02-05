import { Text, useTexture } from "@react-three/drei";
import { forwardRef, Suspense, useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Vector3 } from "three";

const TEXTURE_WIDTH = 8;
const TEXTRUE_HEIGHT = 9;
const MOTION = {
  IDLE: { idx: 8, frame: 2 },
  WALK: { idx: 6, frame: 4 },
  DASH: { idx: 5, frame: 8 },
};
const FRAME = 15;

const CharacterMesh = forwardRef(({ initPosition, id }, paramRef) => {
  // 텍스쳐 설정
  // const texture = useTexture('/player/players_blue_x1.png')
  const texture = useTexture("/player/AnimationSheet_Character.png");
  texture.repeat.set(1 / TEXTURE_WIDTH, 1 / TEXTRUE_HEIGHT)

  const ref = useRef();
  let cnt = 0;

  useFrame(() => {

    const charState = paramRef.current.charState ? paramRef.current.charState : "IDLE"
    const charDir = paramRef.current.charDir ? paramRef.current.charDir : "RIGHT"

    
    if(ref.current.stateSum != `${charState} ${charDir}`) {
      cnt = 0;
      texture.offset.x = 0;
    }

    ref.current.stateSum = `${charState} ${charDir}`

    texture.offset.y = (1 / 9) * MOTION[charState].idx

    if(charDir === 'RIGHT') {
      texture.repeat.set(1 / TEXTURE_WIDTH, 1 / TEXTRUE_HEIGHT)

      cnt += 1;
      if(cnt === FRAME) {
        texture.offset.x += 1 / TEXTURE_WIDTH;
        cnt = 0;
      }
  
      if(texture.offset.x >= (1 / TEXTURE_WIDTH) * MOTION[charState].frame) {
        texture.offset.x = 0;
      }

    } else if (charDir === 'LEFT') {
      texture.repeat.set(- 1 / TEXTURE_WIDTH, 1 / TEXTRUE_HEIGHT);

      cnt += 1;
      if(cnt === FRAME) {
        texture.offset.x += 1 / TEXTURE_WIDTH;
        cnt = 0;
      }
  
      if(texture.offset.x >= (1 / TEXTURE_WIDTH) * MOTION[charState].frame) {
        texture.offset.x = 0;
      }
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
        <meshStandardMaterial ref={ref} map={texture} transparent={true} />
      </mesh>
    </>
  );
});

export default CharacterMesh;
