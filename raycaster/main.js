import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);


// Create a box geometry with physical material
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x0077ff,
  roughness: 0.5,
  metalness: 0.5
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Create a sphere geometry with physical material
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff7700,
  roughness: 0.5,
  metalness: 0.5
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 2; // Position the sphere to the right
scene.add(sphere);

// Add studio lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2; // Minimum distance from the camera
controls.maxDistance = 10; // Maximum distance from the camera


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointMove(event){
  // Calculate mouse position in normalized device coordinates (NDC)
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

  // Perform raycasting
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    // Change color of intersected object
    intersects[0].object.material.emissive = new THREE.Color(0xff0000);
  } else {
    // Reset color of all objects
    scene.children.forEach(child => {
      if (child.type === 'Mesh') {
        child.material.emissive.set(0x000000);
      }
    });
  }
}

window.addEventListener('mousemove', onPointMove);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls
  renderer.render(scene, camera);
}

animate();


window.addEventListener('resize', () => {
  // Update camera aspect ratio and renderer size
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
