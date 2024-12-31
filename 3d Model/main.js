import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'; // Import the RGBELoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Load HDRI environment
const RGBE = new RGBELoader();
RGBE.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/dry_orchard_meadow_2k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularRefractionMapping; // Set mapping type
    scene.background = texture; // Set the scene background
    scene.environment = texture; // Set the scene environment
});

// Load GLTF model
const loader = new GLTFLoader();
loader.load('./scifi_gun/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update(); // Update controls for smooth interaction
}
animate();

// Handle responsiveness
window.addEventListener('resize', () => {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer size and pixel ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
