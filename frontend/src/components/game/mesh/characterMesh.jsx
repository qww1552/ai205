import { Text, useTexture } from "@react-three/drei";
import { forwardRef, Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3, RepeatWrapping } from "three";

import { TEXTURE_WIDTH, TEXTRUE_HEIGHT, FPS, MOTION, COLOR } from "config/texture";

const CharacterMesh = forwardRef(({ id, isAlive=true , color=0}, paramRef) => {
  // 텍스쳐 설정
  // const texture = useTexture('/player/players_blue_x1.png')

  const originTexture = useTexture(
    `/testImg/char_color/char_${COLOR[color]}.png`,
    // "/player/AnimationSheet_Character.png",
    (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
    }
  ); 

  const texture = useMemo(() => originTexture.clone(), [originTexture]);
  
  texture.repeat.y = 1 / TEXTRUE_HEIGHT;

  const ref = useRef();
  let cnt = 0;

  useFrame(() => {

    const charState = paramRef?.current?.charState
      ? paramRef.current.charState
      : "IDLE";
    const charDir = paramRef?.current?.charDir
      ? paramRef.current.charDir
      : "RIGHT";

    // 상태 변화
    if (ref.current.stateSum != `${charState} ${charDir}`) {
      cnt = 0;

      if (charDir === 'RIGHT')
        texture.offset.x = 0;
      else if (charDir === 'LEFT') 
        texture.offset.x = 1 / TEXTURE_WIDTH;
    }

    ref.current.stateSum = `${charState} ${charDir}`;

    texture.offset.y = (1 / TEXTRUE_HEIGHT) * MOTION[charState].idx;

    if (charDir === "RIGHT") {
      texture.repeat.x = 1 / TEXTURE_WIDTH;

      cnt += 1;
      if (cnt === FPS) {
        texture.offset.x += 1 / TEXTURE_WIDTH;
        cnt = 0;
      }

      if (texture.offset.x >= (1 / TEXTURE_WIDTH) * MOTION[charState].frame) {
        texture.offset.x = 0;
      }

    } else if (charDir === "LEFT") {
      texture.repeat.x = - 1 / TEXTURE_WIDTH;
      
      cnt += 1;
      if (cnt === FPS) {
        texture.offset.x += 1 / TEXTURE_WIDTH;
        cnt = 0;
      }

      if (texture.offset.x >= (1 / TEXTURE_WIDTH) * (MOTION[charState].frame + 1)) {
        texture.offset.x = 1 / TEXTURE_WIDTH;
      }

    }
  });

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
      <mesh  renderOrder={0}>
        <planeGeometry args={[1, 1]} attach="geometry" />
        <meshStandardMaterial  ref={ref} map={texture} transparent={true} opacity={isAlive ? 1.0 : 0.2}/>
      </mesh>
    </>
  );
});

export default CharacterMesh;
