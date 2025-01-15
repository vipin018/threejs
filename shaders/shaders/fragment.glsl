precision mediump float;

varying vec2 vUv;

void main() {
    vec4 color1 = vec4(0.0, 0.0, 0.0, 1.0); // Deep Coral
    vec4 color2 = vec4(1.0, 1., 1.0, 1.0); // Royal Blue

    float checker = mod(floor(vUv.x * 10.0) + floor(vUv.y * 10.0), 2.0); // Checker pattern
    vec4 finalColor = mix(color1, color2, checker);
    gl_FragColor = finalColor;
}

