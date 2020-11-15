import { Mesh, OrthographicCamera, PlaneBufferGeometry, Scene, ShaderMaterial, UniformsUtils, Vector2 } from 'three'
import { Pass } from 'three/examples/jsm/postprocessing/Pass'

const BoxShader = {
  uniforms: {
    byp: { value: 0 }, //apply the glitch ?
    tex: { type: 't', value: null },
    time: { type: 'f', value: 0.0 },
    factor: { type: 'f', value: 0.0 },
    resolution: { type: 'v2', value: null }
  },

  vertexShader: `varying vec2 vUv;
    void main(){  
      vUv = uv; 
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }`,

  fragmentShader: `uniform int byp; //should we apply the glitch ?
    uniform float time;
    uniform float factor;
    uniform vec2 resolution;
    uniform sampler2D tex;
    
    varying vec2 vUv;
    
    void main() {  
      if (byp<1) {
        vec2 uv1 = vUv;
        vec2 uv = gl_FragCoord.xy/resolution.xy;
        float frequency = 6.0;
        float amplitude = 0.015 * sqrt(time);
        float x = uv1.y * frequency + time * .2; 
        float y = uv1.x * sin(frequency) * 20. + time ;
        uv1.x += sin(x+y) * amplitude * cos(y);
        uv1.y += cos(x-y) * amplitude * cos(y);
        vec4 rgba = texture2D(tex, uv1);
        gl_FragColor = rgba;
      } else {
        gl_FragColor = texture2D(tex, vUv);
      }
    }`
}

let BoxeryShader = function (dt_size) {
  Pass.call(this);

  if (BoxShader === undefined) {
    console.error('THREE.BoxeryShader relies on THREE.WaterShader');
  }
  const shader = BoxShader;

  this.uniforms = UniformsUtils.clone(shader.uniforms);

  dt_size = dt_size === undefined ? 64 : dt_size;

  this.uniforms['resolution'].value = new Vector2(dt_size, dt_size);

  this.material = new ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader
  });
  this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new Scene();
  this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
  this.quad.frustumCulled = false; // Avoid getting clipped
  this.scene.add(this.quad);
  this.factor = 0;
  this.time = 0;
}

BoxeryShader.prototype = Object.assign(Object.create(Pass.prototype), {
  constructor: BoxeryShader,

  render: function (renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    const factor = Math.max(0, this.factor);
    this.uniforms['byp'].value = factor ? 0 : 1;
    this.uniforms['tex'].value = readBuffer.texture;
    this.uniforms['time'].value = this.time;
    this.uniforms['factor'].value = this.factor;
    this.time += 0.05;
    this.quad.material = this.material;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null)
      renderer.render(this.scene, this.camera)
    } else {
      renderer.setRenderTarget(writeBuffer)
      if (this.clear) renderer.clear()
      renderer.render(this.scene, this.camera)
    }
  }
})

export { BoxeryShader }
