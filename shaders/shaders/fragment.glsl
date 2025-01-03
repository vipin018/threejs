precision mediump float;

uniform sampler2D uTexture; // Texture sampler
varying vec2 vUv; // UV coordinates
varying vec3 vNormal; // Normal vector for shadow effect

void main() {
    // Solid matte color for the cloth base
    vec4 baseColor = vec4(0.5, 0.3, 0.2, 1.0); // Matte brownish color

    // Apply texture
    vec4 textureColor = texture2D(uTexture, vUv); // Sample the texture at the current UV coordinates

    // Use the normal vector to simulate shadowing at curves (darker near the folds)
    float shadowIntensity = dot(vNormal, vec3(0.0, 1.0, 0.0)); // Dot product for shadow intensity
    shadowIntensity = clamp(shadowIntensity, 5., 1.0); // Darken folds, keep some light

    // Combine the texture color with the base color and shadow intensity
    vec4 shadowColor = mix(baseColor, textureColor, 0.5); // Mix base color with texture
    shadowColor *= shadowIntensity; // Apply the shadow intensity

    gl_FragColor = shadowColor; // Final color with texture and shadows
}
