import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { RGBELoader } from "three/addons/loaders/RGBELoader.js"
// Create scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);
camera.position.z = 4;


let TextureLoader = new THREE.TextureLoader();
let texture = TextureLoader.load("./earth.jpg");
texture.colorSpace = THREE.SRGBColorSpace;

let texture2 = TextureLoader.load("./clouds.jpg");
texture2.colorSpace = THREE.SRGBColorSpace;


const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 250, 250);
const material = new THREE.MeshPhysicalMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const geometry2 = new THREE.SphereGeometry(1.002, 250, 250);
const material2 = new THREE.MeshPhysicalMaterial({ alphaMap: texture2 });
// material2.alphaMap = true;
material2.transparent = true;
const sphere2 = new THREE.Mesh(geometry2, material2);
scene.add(sphere2);

let hdri = new RGBELoader();
hdri.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/rogland_sunset_4k.hdr",
    function (hdritexture) {
        hdritexture.mapping = THREE.EquirectangularRefractionMapping;
        scene.environment = hdritexture;
    }
)

// Position camera
renderer.render(scene, camera);

// Animation loop
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    sphere.rotation.y = clock.getElapsedTime()/25;
    sphere2.rotation.y = -clock.getElapsedTime()/24;
    renderer.render(scene, camera);
}

animate();