import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import GameMap from "./gameMap";

const MyTest = () => {

    return (<>
    <div style={{ width: "100vw", height: "100vh" }}>

        <Canvas flat linear>
            <ambientLight intensity={1} />
            <GameMap />
            <OrthographicCamera />
          <OrbitControls />
        </Canvas>
        </div>
    </>)
}

export default MyTest;