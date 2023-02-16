import { Text, useTexture } from "@react-three/drei";
import { forwardRef, Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Vector3, RepeatWrapping } from "three";

import { TEXTURE_WIDTH, TEXTRUE_HEIGHT, FPS, MOTION, COLOR } from "config/texture";

const DeadMesh = ({color=0}) => {
  // 텍스쳐 설정
  // const texture = useTexture('/player/players_blue_x1.png')
  const originTexture = useTexture(
    `/testImg/char_color/char_${COLOR[color]}.png`,
    (texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
    }
  );

  const texture = useMemo(() => originTexture.clone(), [originTexture]);

  texture.repeat.y = 1 / TEXTRUE_HEIGHT;
  texture.repeat.x = 1 / TEXTURE_WIDTH;
  texture.offset.y = (1 / TEXTRUE_HEIGHT) * MOTION["DEAD"].idx;

  const ref = useRef();
  let cnt = 0;

  let once = false

  useFrame(() => {

    if(once) return;

    cnt += 1;
    if (cnt === 4) {
      texture.offset.x += 1 / TEXTURE_WIDTH;
      cnt = 0
    }

    if (texture.offset.x >= (1 / TEXTURE_WIDTH) * (MOTION["DEAD"].frame - 1)) {
      once = true
    }
  });

  return (
    <>
      <mesh>
        <planeGeometry args={[1, 1]} attach="geometry" />
        <meshStandardMaterial ref={ref} map={texture} transparent={true} />
      </mesh>
    </>
  );
};

export default DeadMesh;
