// Simulation Vertex Shader
export const simulationVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Simulation Fragment Shader
export const simulationFragmentShader = `
uniform sampler2D textureA; // Input texture for simulation data
uniform vec2 mouse; // Mouse position in screen coordinates
uniform vec2 resolution; // Resolution of the screen or texture
uniform float time; // Time variable for time-based effects
uniform int frame; // Current frame number

varying vec2 vUv; // Interpolated UV coordinates

const float delta = 1.4; // Simulation step size or damping factor

void main() {
    vec2 uv = vUv;

    // Initialize the simulation on the first frame
    if (float(frame) == 0.0) {
        gl_FragColor = vec4(0.0); // Reset the simulation
        return;
    }

    // Read simulation data from the input texture
    vec4 data = texture2D(textureA, uv);
    float pressure = data.x; // Pressure value
    float pVel = data.y; // Pressure velocity

    // Calculate the size of a single texel (pixel in texture space)
    vec2 texelSize = 0.9 / resolution;

    // Sample neighboring pressure values
    float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
    float p_left = texture2D(textureA, uv - vec2(texelSize.x, 0.0)).x;
    float p_top = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
    float p_bottom = texture2D(textureA, uv - vec2(0.0, texelSize.y)).x;

    // Handle boundary conditions (edge cases)
    if (uv.x <= texelSize.x) p_left = p_right; // Mirror left edge
    if (uv.x >= 1.0 - texelSize.x) p_right = p_left; // Mirror right edge
    if (uv.y <= texelSize.y) p_bottom = p_top; // Mirror bottom edge
    if (uv.y >= 1.0 - texelSize.y) p_top = p_bottom; // Mirror top edge

    // Update pressure velocity using finite differences
    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0; // Horizontal
    pVel += delta * (-2.0 * pressure + p_top + p_bottom) / 4.0; // Vertical

    // Update pressure and apply damping
    pressure += delta * pVel;
    pVel -= 0.005 * delta * pressure;
    pVel *= 1.0 - 0.002 * delta;
    pressure *= 0.999;

    // Convert mouse position to UV space
    vec2 mouse_uv = mouse / resolution;

    // Add a pressure disturbance at the mouse position
    if (mouse.x > 0.0) {
        float dist = distance(uv, mouse_uv);
        if (dist <= 0.02) {
            pressure += 2.0 * (1.0 - dist / 0.02);
        }
    }

    // Output the updated simulation data
    gl_FragColor = vec4(pressure, pVel, (p_right - p_left) / 3.0, (p_top - p_bottom) / 3.0);
}
`;

// Render Vertex Shader
export const renderVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Render Fragment Shader
export const renderFragmentShader = `
uniform sampler2D textureA; // Simulation data texture
uniform sampler2D textureB; // Background texture

varying vec2 vUv;

void main() {
    // Read simulation data
    vec4 data = texture2D(textureA, vUv);

    // Calculate distortion based on pressure gradients
    vec2 distortion = 0.3 * data.zw;

    // Sample the background texture with distortion
    vec4 color = texture2D(textureB, vUv + distortion);

    // Calculate a normal vector from the pressure gradients
    vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));
    vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
    float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 2.0;

    // Output the final color with specular highlights
    gl_FragColor = color + vec4(specular);
}
`;