import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
// Initialize scene

const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const clothTexture = textureLoader.load('./img.jpg'); // Provide the path to your image



// Create a geometry and a material, then combine them into a mesh
const geometry = new THREE.PlaneGeometry(3,3,100,100,);
const material = new THREE.ShaderMaterial({
  // wireframe: true,
  vertexShader: vertex,
  fragmentShader: fragment,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: clothTexture },
  },
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update(); // Update controls
  material.uniforms.uTime.value += 0.1; // Update shader uniforms
  renderer.render(scene, camera);
}
animate();
