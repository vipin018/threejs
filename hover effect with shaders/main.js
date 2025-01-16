import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';
import vertex from './shaders/vertex.glsl?raw';
import fragment from './shaders/fragment.glsl?raw';


let scene, camera, renderer, width, height;

//geometry

let geometry;

//meshes

let mesh;

//materials
let material;

width = window.innerWidth;
height = window.innerHeight;

// init

let textureLoad = new THREE.TextureLoader();

camera = new THREE.PerspectiveCamera(70, width / height, 100, 2000);
camera.fov = 2 * Math.atan(height / 2 / 600) * (180 / Math.PI);
camera.position.z = 600;

scene = new THREE.Scene();

geometry = new THREE.PlaneGeometry(1, 1, 40, 40);

material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    time: { value: 0 },
    uMouseOverPos: { value: new THREE.Vector2(0.5, 0.5) },
    uTexture: { value: textureLoad.load('ai.jpg') },
    uDisp: { value: null },
    resolution: { value: new THREE.Vector2(width, height) },
    imageSize: { value: new THREE.Vector2(0, 0) }
  }
})

mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

mesh.scale.set(width/2, height/2,1);

mesh.position.y = -100;

let normals = [
  'ice.jpg',
  'normal1.jpg',
  'normal2.jpg',
  'normal3.png',
]
textureLoad.load(normals[3], (texture) => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  material.uniforms.uDisp.value = texture;
});


const images = textureLoad.load('ai.jpg', () => {
  const textureWidth = images.image.width;
  const textureHeight = images.image.height;
  material.uniforms.imageSize.value = new THREE.Vector2(textureWidth, textureHeight);
});


renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);


window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
)


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  gsap.to(mouse, {
    x: x,
    y: y,
  })
});



function animate(time) {
  material.uniforms.time.value = time / 1000;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(mesh);

  if (intersects.length > 0) {
    const uv = intersects[0].uv;
    material.uniforms.uMouseOverPos.value = uv;
    // console.log('UV coordinates:', uv);
  }
  renderer.render(scene, camera);

}