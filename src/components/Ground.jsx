import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

export const Ground = ({position}) => {

    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1, 0]}
            receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial color={'orange'} attach='material' opacity={1} />
        </mesh>
    );
}