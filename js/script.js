import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js';

const container = document.getElementById('future3d');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
container.appendChild(renderer.domElement);

// Свет
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const loader = new GLTFLoader();
let tee;

loader.load(
  'assets/3d/tee.glb',
  (gltf) => {
    tee = gltf.scene;
    tee.scale.set(1.5, 1.5, 1.5);
    tee.rotation.y = Math.PI;
    scene.add(tee);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);


function animate() {
  requestAnimationFrame(animate);

  if (tee) {
    tee.rotation.y += 0.004;
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / (window.innerHeight * 0.6);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight * 0.6);
});
