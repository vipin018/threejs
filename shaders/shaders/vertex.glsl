precision mediump float;
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
void main() {
    vUv = uv; // Pass the UV coordinates to the fragment shader
     vNormal = normalize(normalMatrix * normal); // Normalize the normal vector
    vec4 modelPosition = modelMatrix*vec4(position,1.);
modelPosition.z-=1.3*sin(modelPosition.x*5.+modelPosition.y*3.+uTime)*4.7;
//modelPosition.z+=sin(modelPosition.x*5.+modelPosition.y*3.)+uTime*5.6;
    vec4 viewPosition = viewMatrix*modelPosition;
    vec4 projectedPosition = projectionMatrix*viewPosition;

    gl_Position = projectedPosition;
}



   