import { KeyboardControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier";
import Character from "./character";
import Obstacle from "./obstacle";

const game = () => {
    return (
        <KeyboardControls
            map={[
                { name: "forward", keys: ["ArrowUp", "w", "W"] },
                { name: "backward", keys: ["ArrowDown", "s", "S"] },
                { name: "left", keys: ["ArrowLeft", "a", "A"] },
                { name: "right", keys: ["ArrowRight", "d", "D"] },
                { name: "jump", keys: ["Space"] },
            ]}>
            <Canvas>
            <ambientLight intensity={0.1} />
            <directionalLight position={[0, 0, 5]} />
                <Physics gravity={[0,0,0]} >
                    <Character initPosition={[0,-0.5,0]} initColor="red"/>
                    <Obstacle/>
                </Physics>
                <OrthographicCamera/>
            </Canvas>
        </KeyboardControls>
    )
}

export default game;