import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaadfff); // light sky color

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(15, 15, 15);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Grass plane
const grassMat = new THREE.MeshLambertMaterial({ color: 0x4caf50 });
const grassGeo = new THREE.PlaneGeometry(40, 40);
const grass = new THREE.Mesh(grassGeo, grassMat);
grass.rotation.x = -Math.PI / 2;
scene.add(grass);

// Path (road)
const pathMat = new THREE.MeshStandardMaterial({ color: 0xbababa });
const pathGeo = new THREE.PlaneGeometry(50, 4);
const path = new THREE.Mesh(pathGeo, pathMat);
path.rotation.x = -Math.PI / 2;
path.position.set(0, 0.01, 0);
path.rotation.z = Math.PI / 4;
scene.add(path);

// New road between Building 1 and Building 2
const roadBetweenGeo = new THREE.PlaneGeometry(20, 2); // Adjusted width and length
const roadBetween = new THREE.Mesh(roadBetweenGeo, pathMat);
roadBetween.rotation.x = -Math.PI / 2;
roadBetween.rotation.z = -3.1;
roadBetween.position.set(10, 0.01, 2.5); // Centered between [-12, 1] and [-1, 10]
scene.add(roadBetween);

const buildingMat1 = new THREE.MeshPhongMaterial({ color: 0x9bbad3 });
const buildingMat2 = new THREE.MeshPhongMaterial({ color: 0xffd180 });

function createBuilding(mat, pos, rotationY = Math.PI / 4) {
  const geo = new THREE.BoxGeometry(9, 3, 4);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(...pos);
  mesh.rotation.y = rotationY; // Ensure this is set correctly
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

// calls
createBuilding(buildingMat1, [-9, 1.5, 1]); // left
createBuilding(buildingMat2, [2, 1.5, 10], 0); // middle vertical (explicitly set to 0)
createBuilding(buildingMat1, [10, 1.5, -2]); // right

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Directional light (like sunlight)
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
scene.add(dirLight);

// Optional point light near ground for contrast
const pointLight = new THREE.PointLight(0xfff2b0, 0.5);
pointLight.position.set(0, 3, 0);
scene.add(pointLight);

function createTree(x, z) {
  const trunkGeo = new THREE.CylinderGeometry(0.1, 0.1, 1);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.set(x, 0.5, z);

  const leavesGeo = new THREE.SphereGeometry(0.8, 16, 16);
  const leavesMat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 });
  const leaves = new THREE.Mesh(leavesGeo, leavesMat);
  leaves.position.set(x, 1.4, z);

  scene.add(trunk, leaves);
}

createTree(-3, 0);
createTree(2, 3);
createTree(5, -2);
createTree(-7, -4);

// Move all objects 3 units towards -x axis
scene.traverse((object) => {
  if (object.isMesh || object.isLight) {
    object.position.x -= 3;
  }
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
