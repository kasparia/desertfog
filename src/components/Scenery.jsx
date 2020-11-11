import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Boxery } from './Boxery';
import { SceneryLight } from './SceneryLight';
import { Ground } from './Ground';


export const Scenery = () => {
    return (
        <Canvas
            colorManagement
            camera={{ 
                position: [-5, 2, 10],
                fov: 60
            }}
        >
            <SceneryLight />
            <Ground />
            <Boxery position={[5, 1, -2]} />
        </Canvas>
    );
}