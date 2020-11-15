import React from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Boxery } from './Boxery';
import { SceneryLight } from './SceneryLight';
import { Ground } from './Ground';
import { softShadows, OrbitControls } from 'drei';
import { Effects } from './Effects';
softShadows();

const SceneCamera = () => {
    useFrame(({ clock, camera }) => {
        camera.position.z = Math.sin(clock.getElapsedTime()) * 5;
        camera.position.x = Math.sin(clock.getElapsedTime()) * 5;
        camera.lookAt(-1, 1, -5);
    })

    return null;
}

export const Scenery = () => {
    return (
        <Canvas
            colorManagement
            camera={{ 
                position: [-5, 3, 5],
                fov: 60
            }}
            shadowMap
        >
            <fog attach='fog' args={['#cc7b32', 2, 20]} />
            <SceneryLight />
            <Ground />
            <Boxery position={[-1, 1, -5]} />
            <Effects />
            <SceneCamera />
        </Canvas>
    );
}