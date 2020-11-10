import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Boxery } from './Boxery';
import { SceneryLight } from './SceneryLight';


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
            <Boxery position={[5, 1, -2]} />
        </Canvas>
    );
}