import React, { useRef, useMemo } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber'
import NewShader from './shaders/NewShader';

extend({ NewShader })

const BoxShader = {
    uniforms: {
      byp: { value: 0 }, //apply the glitch ?
      tex: { type: 't', value: null },
      time: { type: 'f', value: 0.0 },
      factor: { type: 'f', value: 0.0 },
      resolution: { type: 'v2', value: null }
    },
  
    vertexShader: `varying vec2 vUv;
      uniform float time;
      void main(){  
          vUv = uv;
          mat4 proc = projectionMatrix;
  
  
          
          vec3 ff = vec3(vUv, sin(time));
  
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  
          gl_Position =
            proc
            * modelViewPosition
            * vec4(sin(time), 1., 1., 1.)
          ;
          
      }`,
  
    fragmentShader: `uniform int byp; //should we apply the glitch ?
      uniform float time;
      uniform float factor;
      uniform vec2 resolution;
      uniform sampler2D tex;
      
      varying vec2 vUv;
      
      void main() {
          vec2 uv1 = vUv;
          vec2 uv = gl_FragCoord.xy/resolution.xy;
          float frequency = 6.0;
          float amplitude = 0.015 * sin(sqrt(time)) * 10.;
          float x = uv1.y * cos(frequency) + sin(time) * .2; 
          float y = uv1.x * sin(frequency) * 10. + time ;
          uv1.x += cos(x+y) * cos(sqrt(time)) * sin(y);
          uv1.y += cos(x+y) * sin(amplitude) * cos(y);
          vec4 rgba = texture2D(tex, uv1);
          gl_FragColor = rgba;
          gl_FragColor = texture2D(tex, vUv);
      }`
  }


export const Boxery = ({position}) => {
    const ref = useRef();
    const { size, viewport, gl, scene, camera, clock } = useThree()
    // let tick = 0.01;
    let meshPosition = position;

    const [shade] = useMemo(() => {
        const shade = new NewShader({
          time: 0.1
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