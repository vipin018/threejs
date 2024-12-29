import * as THREE from 'three';

// Create scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();

// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  2.0, // v2

	 4.0,  0.1,  1.0, // v3
	-1.0,  2.0,  1.0, // v4
	-1.0, -1.0,  0.0  // v5
] );

// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh = new THREE.Mesh( geometry, material );

scene.add(mesh);

// const geometry = new THREE.TorusKnotGeometry(12, 4, 100);
// const material = new THREE.MeshBasicMaterial({ color: "green", wireframe:false });
// const torusKnot = new THREE.Mesh(geometry, material);
//  scene.add(torusKnot);


// Create a cube
// const cubegeometry = new THREE.BoxGeometry(2, 1.5, 2);
// const cubematerial = new THREE.MeshBasicMaterial({ color: "grey" });
// const cube = new THREE.Mesh(cubegeometry, cubematerial);

// const sphereGeometry = new THREE.SphereGeometry(1,10,10);
// const sphereMaterial = new THREE.MeshBasicMaterial({color:"red"});
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// scene.add(cube);
// scene.add(sphere);

// cube.position.x=-2;
// sphere.position.x=2;
// cube.rotation.y = 1;

// const group = new THREE.Group();

// group.add(cube);
// group.add(sphere);
// scene.add(group);

// group.position.z=1;

// Math.Pi is basically the 180deg 
// so if you want angles like 90deg then use `Math.Pi/2`.
//  since 90 deg is Math.PI/2 so if you need multiple of 90 then use the Math.Pi/2 stuff.

// cube.rotation.z += Math.PI - 0.2;

// Position camera
camera.position.z = 5;
renderer.render(scene, camera);

// Animation loop
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    // console.log(clock.getElapsedTime());
    // Rotate cube
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;

    // sphere.rotation.x += 0.01;
    // sphere.rotation.y += 0.01;

    // group.rotation.x += 0.01;
    // group.rotation.y += 0.01;

    torusKnot.rotation.x = clock.getElapsedTime() * 2;
    renderer.render(scene, camera);
}

animate();