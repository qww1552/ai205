import { OrthographicCamera, OrbitControls, SpotLight } from "@react-three/drei";
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
import DeadMesh from "../mesh/deadMesh";
import { selectDead } from "app/dead";
import { selectMe } from "app/me";
import DeadCharacter from "components/game/canvas/deadCharacter";

const GameCanvas = () => {
  const stateMe = useSelector(selectMe);
  const players = useSelector(selectOhterPlayers);
  const gameInfo = useSelector(selectGameInfo);
  const deadList = useSelector(selectDead).deadList;

  // const players = [
  //   {
  //     player: {
  //       id: "asdfadsf",
  //       role: "mafia",
  //       isAlive: false,
  //     },
  //     location: {
  //       y: 1,
  //       x: 1,
  //     },
  //   },
  // ];

  // const deadList = [
  //   {
  //     player: {
  //       id: "asdfadsf",
  //       role: "mafia",
  //       isAlive: false,
  //     },
  //     location: {
  //       y: 1,
  //       x: 1,
  //     },
  //   },
  // ];
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas flat linear>
          <ambientLight intensity={0.3} />
          <Physics
            timeStep={1 / 60}
            gravity={[0, 0, 0]}
            paused={gameInfo.isInMeeting}
          >
            {/* <Debug /> */}
            <MyCharacter initPosition={[0, 0, 0]} initColor="red" />
            {players.map((data, idx) => (
              ((!stateMe.player.isAlive)||(stateMe.player.isAlive == data.player.isAlive)) &&
              <OtherCharacter
                initPosition={[0, 0, 0]}
                initColor="blue"
                id={data.player.id}
                key={`${data.player.id}${idx}`}
                location={data.location}
                isAlive={data.player.isAlive}
              />
            ))}
            {deadList.map((dead, idx) => (
              <DeadCharacter
                id={`${dead.player.id}`}
                position={dead.location}
                key={`${dead.player.id}${idx}`}
              />
            ))}
            <SimpleMap />
          </Physics>
          <OrthographicCamera />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </>
  );
};

export default GameCanvas;
