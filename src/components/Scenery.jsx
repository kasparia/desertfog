import React from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Boxery } from './Boxery';
import { SceneryLight } from './SceneryLight';
import { Ground } from './Ground';
import { softShadows, OrbitControls } from 'drei';
import { Effects } from './Effects';

softShadows();

function Dolly() {
    // This one makes the camera move in and out
    useFrame(({ clock, camera }) => {
      camera.position.z = Math.sin(clock.getElapsedTime()) * 5
    })
    return null
}

export const Scenery = () => {
    return (
        <Canvas
            colorManagement
            camera={{ 
                position: [-5, 5, 5],
                fov: 60
            }}
            shadowMap
        >
            <fog attach='fog' args={['#cc7b32', 2, 20]} />
            <SceneryLight />
            <Ground />
            <Boxery position={[5, 1, -2]} />
            <OrbitControls
                autoRotate
                enablePan={false}
                enableZoom={false}
                enableDamping
                dampingFactor={0.5}
                rotateSpeed={1}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
            <Effects />
            <Dolly />
        </Canvas>
    );
}