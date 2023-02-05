import { Text, useTexture } from "@react-three/drei";
import { forwardRef, memo, Suspense, useCallback, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3, RepeatWrapping } from "three";

const TEXTURE_WIDTH = 8;
const TEXTRUE_HEIGHT = 9;
const MOTION = {
  IDLE: { idx: 8, frame: 2 },
  WALK: { idx: 6, frame: 4 },
  DASH: { idx: 5, frame: 8 },
};
const FPS = 10;

const CharacterMesh = memo(({id, charState, charDir }) => {
  // 텍스쳐 설정
  // const texture = useTexture('/player/players_blue_x1.png')
  const texture = useTexture(
    "/player/AnimationSheet_Character.png",
    (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
    }
  );
  texture.repeat.y = 1 / TEXTRUE_HEIGHT;

  const ref = useRef();
  let cnt = 0;

  useState(() => {
    cnt = 0;
  }, [charState]);

  useState(() => {
    cnt = 0;
    if (charDir === "RIGHT") texture.offset.x = 0;
    else if (charDir === "LEFT") texture.offset.x = 1 / TEXTURE_WIDTH;
  }, [charDir]);

  const temp = useCallback(() => {
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
      texture.repeat.x = -1 / TEXTURE_WIDTH;

      cnt += 1;
      if (cnt === FPS) {
        texture.offset.x += 1 / TEXTURE_WIDTH;
        cnt = 0;
      }

      if (
        texture.offset.x >=
        (1 / TEXTURE_WIDTH) * (MOTION[charState].frame + 1)
      ) {
        texture.offset.x = 1 / TEXTURE_WIDTH;
      }
    }
  },[charState, charDir])

  useFrame(() => {
    // console.log(`${charState} ${charDir}`)

    // 상태 변화
    // if (ref.current.stateSum != `${charState} ${charDir}`) {
    //   cnt = 0;

    //   if (charDir === "RIGHT") texture.offset.x = 0;
    //   else if (charDir === "LEFT") texture.offset.x = 1 / TEXTURE_WIDTH;
    // }

    // ref.current.stateSum = `${charState} ${charDir}`;
    temp();
  
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
        <mesh>
          {/* <boxGeometry args={[1, 1, 0.1]} /> */}
          <planeGeometry args={[1, 1]} attach="geometry" />
          <meshStandardMaterial ref={ref} map={texture} transparent={true} />
        </mesh>
    </>
  );
});

export default CharacterMesh;
