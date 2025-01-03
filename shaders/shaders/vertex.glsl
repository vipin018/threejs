uniform float uTime;

void main() {
    vec4 modelPosition = modelMatrix*vec4(position,1.);
modelPosition.xy-=0.1*sin(modelPosition.x*5.+modelPosition.y*3.+uTime)*0.7;
//modelPosition.z+=sin(modelPosition.x*5.+modelPosition.y*3.)+uTime*0.2;
    vec4 viewPosition = viewMatrix*modelPosition;
    vec4 projectedPosition = projectionMatrix*viewPosition;

    gl_Position = projectedPosition;
}