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
let AmbientLightlight = new THREE.AmbientLight( "white", 0.1); // it is used when you need equal amount of light everywhere. (color and intensity)
// scene.add(AmbientLightlight);

const DirectionalLight = new THREE.DirectionalLight("white", 5); // it is used when you need light to be fall from a particular direction. (color and intensity)
DirectionalLight.position.set(2, -1, -1); // position of the light in space.
// scene.add(DirectionalLight);

const pointLight = new THREE.PointLight("wgite",1,100);
pointLight.position.set(1, 1, 1);
// scene.add(pointLight);

const spotLight = new THREE.SpotLight("white", 1, 100, Math.PI / 3);
spotLight.position.set(1, 1, 1);
scene.add(spotLight);

const helper = new THREE.SpotLightHelper(spotLight,2);
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

const pointLightFolder = gui.addFolder('Point Light Controls');
pointLightFolder.add(pointLight.position, 'x', -10, 10).name('Point Light X Position');
pointLightFolder.add(pointLight.position, 'y', -10, 10).name('Point Light Y Position');
pointLightFolder.add(pointLight.position, 'z', -10, 10).name('Point Light Z Position');
pointLightFolder.add(pointLight, 'intensity', 0, 10).name('Point Light Intensity');
pointLightFolder.open(); // Open the folder by default


const cubeFolder = gui.addFolder('Cube Controls');
cubeFolder.add(cube.position, 'x', -10, 10).name('Cube X Position');
cubeFolder.add(cube.position, 'y', -10, 10).name('Cube Y Position');
cubeFolder.add(cube.position, 'z', -10, 10).name('Cube Z Position');
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('Cube Rotation X');
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('Cube Rotation Y');
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('Cube Rotation Z');
cubeFolder.open();

const spotLightFolder = gui.addFolder('Spot Light Controls');
spotLightFolder.add(spotLight.position, 'x', -10, 10).name('Spot Light X Position');
spotLightFolder.add(spotLight.position, 'y', -10, 10).name('Spot Light Y Position');
spotLightFolder.add(spotLight.position, 'z', -10, 10).name('Spot Light Z Position');
spotLightFolder.add(spotLight, 'intensity', 0, 10).name('Spot Light Intensity');
spotLightFolder.add(spotLight, 'angle', 0, Math.PI / 2).name('Spot Light Angle'); // Control for the angle of the spotlight
spotLightFolder.open();

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