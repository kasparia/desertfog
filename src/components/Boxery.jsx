import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

export const Boxery = ({position}) => {
    const mesh = useRef(null);
    let tick = 0.01;
    let meshPosition = position;

    useFrame(() => {
        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.01;

        tick += 0.01;
        meshPosition =  [
            Math.sin(mesh.current.position.x * tick ) * 10,
            2,
            1
        ]        
    });

    return (
        <mesh
            ref={ mesh }
            position={ meshPosition }
        >
            <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
}