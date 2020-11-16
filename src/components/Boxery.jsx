import React, { useRef, useMemo } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber'
import NewShader from './shaders/NewShader';

extend({ NewShader })

export const Boxery = ({position}) => {
    const ref = useRef();
    const { size, viewport, gl, scene, camera, clock } = useThree()
    // let tick = 0.01;
    let meshPosition = position;

    const [shade] = useMemo(() => {
        const shade = new NewShader({
          time: 0.1,
          factor: 0.1
        });
        return [shade]
    }, [size]);

    useFrame(() => {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;

        // tick += 0.01;
        /*meshPosition =  [
            Math.sin(ref.current.position.x * tick ) * 1,
            -5,
            -1
        ]  */

        ref.current.material = shade;
    });

    return (
        <mesh
            ref={ ref }
            position={ meshPosition }
            castShadow
        >
            <boxBufferGeometry attach='geometry' args={[1, 1, 1, 64, 64, 64]} />
            <meshStandardMaterial color={'orange'} />
            <shaderMaterial
                attach="material"
                args={[NewShader]}
            />
        </mesh>
    );
}