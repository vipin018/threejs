import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);
camera.position.set = (10,1,50);

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);


const geometry = new THREE.BoxGeometry(1, 2, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// const mouse = {
//     x: 0,
//     y: 0,
// }

// window.addEventListener('mousemove', function (e) {
//     mouse.x = (e.clientX / window.innerWidth) * 2 - 1; // this referes to the mouse position when mouse is moved from left to right
//     mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; // this referes to the mouse position when mouse is moved from top to bottom
//     cube.rotation.y = mouse.x;
//     cube.rotation.x = -mouse.y;
// })

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const gui = new GUI(); // Initialize the GUI

const cubeFolder = gui.addFolder('Cube Properties'); // Create a folder for cube properties
const cubeParams = {
    width: 1,
    height: 2,
    depth: 1,
    color: "#ff0000" // Default color
};

// Add controls for width, height, depth, and color
cubeFolder.add(cubeParams, 'width', 0.1, 5).onChange(updateCubeSize);
cubeFolder.add(cubeParams, 'height', 0.1, 5).onChange(updateCubeSize);
cubeFolder.add(cubeParams, 'depth', 0.1, 5).onChange(updateCubeSize);
cubeFolder.addColor(cubeParams, 'color').onChange(updateCubeColor);

// Add rotation parameters
const rotationParams = {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0 // Reset the rotation on the Z axis (as it doesn't make sense for a 3D box)
};

// Add controls for rotation
cubeFolder.add(rotationParams, 'rotationX', 0, Math.PI * 2).onChange(updateCubeRotation);
cubeFolder.add(rotationParams, 'rotationY', 0, Math.PI * 2).onChange(updateCubeRotation);
cubeFolder.add(rotationParams, 'rotationZ', 0, Math.PI * 2).onChange(updateCubeRotation);
cubeFolder.open(); // Open the folder by default

function updateCubeSize() {
    cube.geometry.dispose(); // Dispose of the old geometry
    cube.geometry = new THREE.BoxGeometry(cubeParams.width, cubeParams.height, cubeParams.depth); // Create new geometry
}

function updateCubeColor() {
    cube.material.color.set(cubeParams.color); // Update the cube's color
}

function updateCubeRotation() {
    cube.rotation.x = rotationParams.rotationX; // Update the cube's rotation on the X axis
    cube.rotation.y = rotationParams.rotationY; // Update the cube's rotation on the Y axis
    cube.rotation.z = rotationParams.rotationZ ; // Reset the cube's rotation on the Z axis (as it doesn't make sense for a 3D box)
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// window resize event
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});