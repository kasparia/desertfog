import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

export const Boxery = ({position}) => {
    const mesh = useRef(null);

    useFrame(() => {
        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.01;
    });

    return (
        <mesh
            ref={ mesh }
            position={ position }
        >
            <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
            <meshStandardMaterial attach='material' />
        </mesh>
    );
}