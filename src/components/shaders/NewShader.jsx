import { ShaderMaterial } from 'three'

export default class NewShader extends ShaderMaterial {
  constructor(options) {
    super({

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
              * vec4(1., 1., 1., 1.)
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
            gl_FragColor = vec4(0.5, 1.0, 0.0, 1.0);
        }`
    })

    this.uniforms = {
      envMap: { value: options.envMap },
      backfaceMap: { value: options.backfaceMap },
      resolution: { value: options.resolution },
      time: { value: options. time },
      byp: { value: options.factor ? 0 : 1 },
      factor: { value: options.factor }
    }
  }
}