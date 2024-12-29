import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// Create scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);
camera.position.z = 55;

let light = new THREE.DirectionalLight("white", 2);
light.position.set(0.1, 0.1, 0.1)
scene.add(light);

let TextureLoader = new THREE.TextureLoader();
let texture = TextureLoader.load("./earth.jpg");


const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(15, 50, 50);
const material = new THREE.MeshStandardMaterial({ map: texture});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
material.metalness = .5;
material.roughness = 1;

// Position camera
renderer.render(scene, camera);

// Animation loop
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // sphere.rotation.y = clock.getElapsedTime();
    renderer.render(scene, camera);
}

animate();