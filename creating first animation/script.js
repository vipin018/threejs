
// Create a new scene to hold all objects in the 3D space 
const scene = new THREE.Scene();

// Create a camera to view the scene from a specific perspective 
const camera = new THREE.PerspectiveCamera(
    75, // Field of view (FOV) in degrees (vertical), 75 is a common value and gives a good balance between wide-angle and narrow perspective
    window.innerWidth / window.innerHeight, // Aspect ratio (width / height) 
    0.1, // Near clipping plane (objects closer than this won't be rendered)
    1000 // Far clipping plane (objects farther than this won't be rendered)
);
// Position the camera away from the origin along the z-axis 
camera.position.z = 5;

// Create a WebGL renderer to display the scene 
const renderer = new THREE.WebGLRenderer();
// Set the size of the renderer to fill the window 
renderer.setSize(window.innerWidth, window.innerHeight);
// Append the renderer's canvas element to the document body 
document.body.appendChild(renderer.domElement);

// Create a cube geometry with default size (1x1x1) 
const geometry = new THREE.BoxGeometry(3, 2, 3);
// Create a basic material with a green color
const material = new THREE.MeshBasicMaterial({ color: "green" });
// Combine the geometry and material to create a mesh (the cube) 
const cube = new THREE.Mesh(geometry, material);
// Add the cube to the scene 
scene.add(cube);

// Define the animation loop function 
function animate() {
    // Request the next frame to create a smooth animation effect 
    requestAnimationFrame(animate);
    // Rotate the cube around the x-axis 
    cube.rotation.x += 0.01;
    // Rotate the cube around the y-axis 
    cube.rotation.y += 0.01;
    // Rotate the cube around the z-axis
    cube.rotation.z += 0.01;
    // Render the scene from the perspective of the camera 
    renderer.render(scene, camera);
}

// Start the animation loop
animate();

/*
Summary:
This script sets up a basic Three.js scene with a rotating green cube. 
It initializes a scene, camera, and renderer, positions the camera, 
creates a cube with a basic material, and adds it to the scene. 
The animate function continuously updates the cube's rotation and 
renders the scene, creating a smooth animation effect.
*/