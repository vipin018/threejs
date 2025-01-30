uniform vec2 uMouseOverPos;
uniform float time;
uniform sampler2D uTexture;
uniform sampler2D uDisp;
uniform vec2 resolution;
uniform vec2 imageSize;

varying vec2 vUv;


void main() {
    vec2 mouse = uMouseOverPos;
    float mouseDistance = distance(vUv, mouse);
    float radius = 0.1;

    flot circle = smoothstep(radius,.0,mouseDistance)

    vec4 image = texture2D(uTexture, vUv);
  
    vec4 red = vec4(1., 0.0, 0.0, 1.0);
    // gl_FragColor = red;
    gl_FragColor = image;

}