import React, { useRef } from 'react';
import { useFrame, extend } from 'react-three-fiber';

export const Boxery = ({position}) => {
    const ref = useRef();
    let tick = 0.01;
    let meshPosition = position;

    useFrame(() => {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;

        tick += 0.01;
        meshPosition =  [
            Math.sin(ref.current.position.x * tick ) * 1,
            -5,
            -1
        ]        
    });

    return (
        <mesh
            ref={ ref }
            position={ meshPosition }
            castShadow
        >
            <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
}