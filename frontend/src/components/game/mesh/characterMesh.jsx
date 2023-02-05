import { Text, useTexture } from "@react-three/drei";
import { forwardRef, Suspense, useRef } from "react";
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

const CharacterMesh = forwardRef(({ initPosition, id }, paramRef) => {
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

  useFrame(() => {
    const charState = paramRef.current.charState
      ? paramRef.current.charState
      : "IDLE";
    const charDir = paramRef.current.charDir
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
      <mesh position={initPosition}>
        {/* <boxGeometry args={[1, 1, 0.1]} /> */}
        <planeGeometry args={[1, 1]} attach="geometry" />
        <meshStandardMaterial ref={ref} map={texture} transparent={true} />
      </mesh>
    </>
  );
});

export default CharacterMesh;
