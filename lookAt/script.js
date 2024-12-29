
// Create a new scene to hold all objects in the 3D space 
const scene = new THREE.Scene();

// Create a camera to view the scene from a specific perspective 
const camera = new THREE.PerspectiveCamera(
    75, // Field of view (FOV) in degrees (vertical), 75 is a common value and gives a good balance between wide-angle and narrow perspective
    window.innerWidth / window.innerHeight, // Aspect ratio (width / height) 
    0.1, // Near clipping plane (objects closer than this won't be rendered)
    1000 // Far clipping plane (objects farther than this won't be rendered)
);

camera.position.z = 8;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas}); 
renderer.setSize(window.innerWidth, window.innerHeight);
// Append the renderer's canvas element to the document body 
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,3,1);

const material = new THREE.MeshBasicMaterial({ color: "green" });

const cube = new THREE.Mesh(geometry, material);

cube.position.x = 0; // Set the cube's x position 
cube.position.z=2; // Set the cube's z position

scene.add(cube);


function animate() {
  
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}


animate();
