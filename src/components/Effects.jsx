import * as THREE from 'three'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import { extend, useThree, useFrame } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { GlitchPass } from './shaders/Glitchpass';
import { WaterPass } from './shaders/Waterpass';

import { BoxeryShader } from './shaders/BoxeryShader';

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass, GlitchPass, WaterPass, BoxeryShader })

export const Effects = ({ down }) => {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()

  const aspect = useMemo(() => {
    return new THREE.Vector2(512, 512);
  }, []);

  let filmLines = 45;
  let glitchTick = 0;

  let [glitchToggle, setToggle] = useState(false);

  useEffect(() => {
    void composer.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(({clock}) => {
    glitchTick = Math.abs(Math.sin(clock.getElapsedTime()));
    // setToggle(~~(glitchTick > 0.8));

    return composer.current.render()
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray='passes' scene={scene} camera={camera} />
      <unrealBloomPass attachArray='passes' args={[aspect, .5, 0.5, 0]} />
      <filmPass attachArray='passes' args={[0.1, 0.62, filmLines, false]} />
      <glitchPass attachArray='passes' factor={ 0 } />
      <waterPass attachArray='passes' />
      <boxeryShader attachArray='passes' factor={2} />
    </effectComposer>
  )
}
