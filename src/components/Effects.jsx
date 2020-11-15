import * as THREE from 'three'
import React, { useRef, useMemo, useEffect } from 'react'
import { extend, useThree, useFrame } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass })

export const Effects = ({ down }) => {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()

  const aspect = useMemo(() => {
    return new THREE.Vector2(512, 512);
  }, []);

  let filmRatio = 0.62;
  let filmLines = 75;

  useEffect(() => {
    void composer.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(({clock}) => {
    //filmRatio = Math.abs(0.3 + Math.sin(clock.getElapsedTime()) * 0.25);
    filmLines = Math.abs(80 + Math.sin(clock.getElapsedTime()) * 25);
    console.log(filmLines);
    return composer.current.render()
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray='passes' scene={scene} camera={camera} />
      <unrealBloomPass attachArray='passes' args={[aspect, 1.5, 1, 0]} />
      <filmPass attachArray='passes' args={[0.1, filmRatio, filmLines, false]} />
    </effectComposer>
  )
}
