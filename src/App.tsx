import {Canvas} from "@react-three/fiber";
import {Scene} from "./Scene.tsx";

function App() {

    return (
        <Canvas style={
            {width: '100vw', height: '100vh'}
        }>
           <Scene />
        </Canvas>
    )
}

export default App
