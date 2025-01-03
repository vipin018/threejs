uniform float uTime;

// Basic vertex shader for ShaderMaterial with model position
varying vec3 vPosition; // Varying variable to pass position to fragment shader

void main() {
    vPosition = position; // Pass the vertex position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // Transform position
}

