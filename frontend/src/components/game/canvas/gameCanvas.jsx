import { OrthographicCamera, OrbitControls, SpotLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/rapier";
import MyCharacter from "../canvas/myCharacter";
import OtherCharacter from "../canvas/otherCharacter";
import { selectOhterPlayers } from "app/others";
import { useSelector } from "react-redux";
import { selectGameInfo } from "app/gameInfo";
import { selectDead } from "app/dead";
import { selectMe } from "app/me";
import DeadCharacter from "components/game/canvas/deadCharacter";
import GameMap from "./map/gameMap";

const GameCanvas = () => {
  const stateMe = useSelector(selectMe);
  const players = useSelector(selectOhterPlayers);
  const isGameStop = useSelector(selectGameInfo).isGameStop;
  const deadList = useSelector(selectDead).deadList;


  return (
    <>
      <div id="gameCanvas" style={{ position: "absolute", width: "100vw", height: "100%" }}>
        <Canvas flat linear>
          {!stateMe.player.isAlive && <ambientLight intensity={0.5} />}
          <Physics
            timeStep={1 / 60}
            gravity={[0, 0, 0]}
            // paused={isGameStop}
          >
            {/* <Debug /> */}
            <MyCharacter color={stateMe.player.color} />
            {players.map((data, idx) => (
              ((!stateMe.player.isAlive)||(stateMe.player.isAlive == data.player.isAlive)) &&
              <OtherCharacter
                color={data.player.color}
                id={data.player.id}
                key={`${data.player.id}${idx}`}
                location={data.location}
                isAlive={data.player.isAlive}
              />
            ))}
            {deadList.map((dead, idx) => (
              <DeadCharacter
                color={dead.player.color}
                id={`${dead.player.id}`}
                position={dead.location}
                key={`${dead.player.id}${idx}`}
              />
            ))}
            <GameMap/>
            {/* <SimpleMap /> */}
          </Physics>
          <OrthographicCamera />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </>
  );
};

export default GameCanvas;
