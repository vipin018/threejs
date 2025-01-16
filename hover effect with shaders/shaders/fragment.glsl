uniform vec2 uMouseOverPos;
uniform float time;
uniform sampler2D uTexture;
uniform sampler2D uDisp;
uniform vec2 resolution;
uniform vec2 imageSize;

varying vec2 vUv;


void main() {
  
    vec4 red = vec4(1., 0.0, 0.0, 1.0);
    gl_FragColor = red;

}