import {
  KeyboardControls,
  OrthographicCamera,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/rapier";
import MyCharacter from "../canvas/myCharacter";
import OtherCharacter from "../canvas/otherCharacter";
import Obstacle from "../canvas/obstacle";
import { useEffect } from "react";
import { action } from "app/store";
import { selectOhterPlayers } from "app/others";
import { useSelector } from "react-redux";
import SimpleMap from "./simpleMap";
import { selectGameInfo } from "app/gameInfo";

const GameCanvas = () => {
  const players = useSelector(selectOhterPlayers);
  const gameInfo = useSelector(selectGameInfo);

  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas flat linear>
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 5]} />
          <Physics
            timeStep={1 / 60}
            gravity={[0, 0, 0]}
            paused={gameInfo.isInMeeting}
          >
            {/* <Debug /> */}
            <MyCharacter 
              initPosition={[0, 0, 0]} 
              initColor="red" 
            />
            {players.map((data, idx) => (
              <OtherCharacter
                initPosition={[0, 0, 0]}
                initColor="blue"
                id={data.player.id}
                key={`${data.player.id}${idx}`}
                location={{ x: data.location.x, y: data.location.y, z: 0 }}
              />
            ))}
            <SimpleMap />
          </Physics>
          <OrthographicCamera />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </KeyboardControls>
  );
};

export default GameCanvas;
