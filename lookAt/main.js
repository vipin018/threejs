import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { color } from 'three/tsl';
// Create scene, camera and renderer
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
// document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);


const geometry = new THREE.BoxGeometry(1, 2, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// const controls = new OrbitControls(camera, renderer.domElement);
// cube.lookAt(-1,-1,0);
// cube.lookAt(new THREE.Vector3(-0.1, 0.1, 0.1));

const mouse = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', function (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1; // this referes to the mouse position when mouse is moved from left to right
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; // this referes to the mouse position when mouse is moved from top to bottom
    cube.rotation.y = mouse.x;
    cube.rotation.x = -mouse.y;
})

function animate() {
    requestAnimationFrame(animate);
    // controls.update();
    renderer.render(scene, camera);
}

animate();

// window resize event
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});