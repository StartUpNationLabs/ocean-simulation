import {useMemo, useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {CameraControls, PerspectiveCamera} from "@react-three/drei";
import noiseFragmentShader from '././shaders/noise/fragmentShader.glsl?raw';
import noiseVertexShader from '././shaders/noise/vertexShader.glsl?raw';


export const Scene = () => {
    const mesh = useRef<any>();
    const uniforms = useMemo(
        () => ({
            u_intensity: {
                value: 1,
            },
            u_time: {
                value: 0.0,
            },
        }),
        []
    );

    useFrame((state) => {
        const {clock} = state;
        mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

        mesh.current.material.uniforms.u_intensity.value = 2 * Math.sin(0.1 * clock.getElapsedTime());
    });
    return (
        <>
            <mesh

                ref={mesh}
            >
                <planeGeometry args={[100, 100]}/>
                <shaderMaterial
                    fragmentShader={noiseFragmentShader}
                    vertexShader={noiseVertexShader}
                    uniforms={uniforms}
                    wireframe={false}
                />
            </mesh>
            <ambientLight intensity={0.1}/>
            <directionalLight position={[0, 0, 5]} color="red"/>
            <CameraControls/>
            <PerspectiveCamera makeDefault position={[0, 0, 150]}/></>

    )
}