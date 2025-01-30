import {
    simulateFragmentShader,
    simulateVertexShader,
    renderFragmentShader,
    renderVertexShader
} from "./shader.js";

document.addEventListener("DOMContentLoaded", () => {

    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2();
    let frame = 0;

    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    const options = {
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        stencilBuffer: false,
        depthBuffer: false,
    }

    let rtA = new THREE.WebGLRenderTarget(width, height, options);
    let rtB = new THREE.WebGLRenderTarget(width, height, options);

    const simMaterial = new THREE.ShaderMaterial({
        uniforms: {
            textureA: { value: null },
            mouse: { value: mouse },
            resolution: { value: new THREE.Vector2(width, height) },
            time: { value: 0.0 },
            frame: { value: 0.0 },
        },
        vertexShader: simulateVertexShader,
        fragmentShader: simulateFragmentShader,
    });

    const renderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            textureA: { value: null },
            textureB: { value: null },
        },
        vertexShader: renderVertexShader,
        fragmentShader: renderFragmentShader,
    });

})
