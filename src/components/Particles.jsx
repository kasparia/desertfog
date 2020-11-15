import React, { useRef } from 'react';
import { useFrame, useMemo } from 'react-three-fiber';

export const Particles = ({}) => {

    //const curve = new THREE.CatmullRomCurve3()

    return (
        <mesh>
            <meshLine attach='geometry' vertices={curve} />
            <meshLineMaterial attach='material' ref={material} transparent depthTest={false} color='orange' lineWidth={1} dashArray={0.1} dashRatio={0.95} />
        </mesh>
    );
}