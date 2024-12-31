import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui'; // Import the dat.gui library

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);
camera.position.z = 4;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);

// lights
let AmbientLightlight = new THREE.AmbientLight( "white", 1); // it is used when you need equal amount of light everywhere. (color and intensity)
scene.add(AmbientLightlight);

const DirectionalLight = new THREE.DirectionalLight("white", 5); // it is used when you need light to be fall from a particular direction. (color and intensity)
DirectionalLight.position.set(2, -1, -1); // position of the light in space.
scene.add(DirectionalLight);

const helper = new THREE.DirectionalLightHelper(DirectionalLight,0.2);
scene.add(helper);

const geometry = new THREE.BoxGeometry(2, 2, 1);
const material = new THREE.MeshPhysicalMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);

const gui = new GUI();
const lightFolder = gui.addFolder('Directional Light');
lightFolder.add(DirectionalLight.position, 'x', -10, 10).name('Light X Position');
lightFolder.add(DirectionalLight.position, 'y', -10, 10).name('Light Y Position');
lightFolder.open(); // Open the folder by default

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