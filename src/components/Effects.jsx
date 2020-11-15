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

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass, GlitchPass, WaterPass })

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
    //glitchToggle = ~~(glitchTick > 0.8);
    setToggle(~~(glitchTick > 0.8));
    console.log(glitchToggle);

    return composer.current.render()
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray='passes' scene={scene} camera={camera} />
      <unrealBloomPass attachArray='passes' args={[aspect, 1.5, 1, 0]} />
      <filmPass attachArray='passes' args={[0.1, 0.62, filmLines, false]} />
      <glitchPass attachArray='passes' factor={ glitchToggle } />
      <waterPass attachArray="passes" factor={1.5} />
    </effectComposer>
  )
}
