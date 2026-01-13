import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaadfff);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(30, 25, 30);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1.2));

const sun = new THREE.DirectionalLight(0xffffe5, 3.5);
sun.position.set(30, 60, 25);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
scene.add(sun);

const backLight = new THREE.DirectionalLight(0xffffff, 1.5);
backLight.position.set(-30, 40, -20);
scene.add(backLight);

const point = new THREE.PointLight(0xfff2b0, 2.0, 80);
point.position.set(0, 10, 0);
scene.add(point);

// === Ground ===
const grassDiff = textureLoader.load(
  "/textures/grass/sparse_grass_diff_4k.jpg"
);
grassDiff.wrapS = grassDiff.wrapT = THREE.RepeatWrapping;
grassDiff.repeat.set(20, 20);

const grassMat = new THREE.MeshStandardMaterial({
  map: grassDiff,
  normalMap: textureLoader.load("/textures/grass/sparse_grass_nor_gl_4k.exr"),
  roughnessMap: textureLoader.load("/textures/grass/sparse_grass_rough_4k.exr"),
  roughness: 0.95,
});

const grass = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), grassMat);
grass.rotation.x = -Math.PI / 2;
grass.receiveShadow = true;
scene.add(grass);

// Roads
const roadDiff = textureLoader.load("/textures/asphalt/asphalt_04_diff_4k.jpg");
roadDiff.wrapS = roadDiff.wrapT = THREE.RepeatWrapping;
roadDiff.repeat.set(15, 5);

const roadMat = new THREE.MeshStandardMaterial({
  map: roadDiff,
  normalMap: textureLoader.load("/textures/asphalt/asphalt_04_nor_gl_4k.exr"),
  roughnessMap: textureLoader.load("/textures/asphalt/asphalt_04_rough_4k.exr"),
  roughness: 0.7,
});

const mainRoad = new THREE.Mesh(new THREE.PlaneGeometry(50, 5), roadMat);
mainRoad.rotation.x = -Math.PI / 2;
mainRoad.rotation.z = Math.PI / 4;
mainRoad.position.y = 0.03;
scene.add(mainRoad);

const connectRoad = new THREE.Mesh(new THREE.PlaneGeometry(25, 3), roadMat);
connectRoad.rotation.x = -Math.PI / 2;
connectRoad.rotation.z = -4.5;
connectRoad.position.set(5, 0.03, 8.5);
scene.add(connectRoad);

// === Buildings ===
const brickDiff = textureLoader.load(
  "/textures/brick/brick_pavement_02_diff_4k.jpg"
);
brickDiff.wrapS = brickDiff.wrapT = THREE.RepeatWrapping;
brickDiff.repeat.set(3, 2);

const brickMat = new THREE.MeshStandardMaterial({
  map: brickDiff,
  normalMap: textureLoader.load(
    "/textures/brick/brick_pavement_02_nor_gl_4k.exr"
  ),
  roughnessMap: textureLoader.load(
    "/textures/brick/brick_pavement_02_rough_4k.exr"
  ),
  roughness: 0.8,
});

createBuilding(brickMat, [-9, 1.5, 1]);
createBuilding(brickMat, [0.5, 1.5, 15], 2);
createBuilding(brickMat, [13, 1.5, 1]);

function createBuilding(mat, pos, rotY = Math.PI / 4) {
  const building = new THREE.Mesh(new THREE.BoxGeometry(9, 3, 4), mat);
  building.position.set(...pos);
  building.rotation.y = rotY;
  building.castShadow = true;
  building.receiveShadow = true;
  building.userData.isBuilding = true;
  scene.add(building);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xaaddff,
    transparent: true,
    opacity: 0.35,
    roughness: 0.05,
    metalness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    depthWrite: false,
  });

  const windowGeo = new THREE.PlaneGeometry(2, 1.6);

  // FRONT WINDOWS (left & right)
  const frontLeft = new THREE.Mesh(windowGeo, glassMat);
  frontLeft.position.set(-2.5, 0, 2.01);
  building.add(frontLeft);

  const frontRight = new THREE.Mesh(windowGeo, glassMat);
  frontRight.position.set(2.5, 0, 2.01);
  building.add(frontRight);

  // REAR WINDOWS (left & right)
  const backLeft = new THREE.Mesh(windowGeo, glassMat);
  backLeft.position.set(-2.5, 0, -2.01);
  backLeft.rotation.y = Math.PI;
  building.add(backLeft);

  const backRight = new THREE.Mesh(windowGeo, glassMat);
  backRight.position.set(2.5, 0, -2.01);
  backRight.rotation.y = Math.PI;
  building.add(backRight);
}

// === Trees ===
function createTree(x, z) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 1.1, 8),
    new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
  );
  trunk.position.set(x, 0.55, z);
  scene.add(trunk);

  const foliage = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
  );
  foliage.position.set(x, 1.5, z);
  scene.add(foliage);
}

createTree(-8, 12);
createTree(10, 12);
createTree(18, -6);
createTree(6, -14);

// === Fox GLTF ===
let mixer, fox;
const clock = new THREE.Clock();
const loader = new GLTFLoader();

loader.load(
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Fox/glTF-Binary/Fox.glb",
  (gltf) => {
    fox = gltf.scene;
    fox.scale.set(0.04, 0.04, 0.04);
    scene.add(fox);

    mixer = new THREE.AnimationMixer(fox);
    mixer
      .clipAction(gltf.animations.find((a) => a.name.includes("Run")))
      .play();
  }
);

// Interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(scene.children, true);
  if (hits[0]?.object.userData.isBuilding) {
    hits[0].object.material.color.set(Math.random() * 0xffffff);
  }
});

// Animate
function animate() {
  const delta = clock.getDelta();
  controls.update();
  mixer?.update(delta);

  if (fox) {
    const t = clock.getElapsedTime() * 0.25;
    fox.position.set(Math.sin(t) * 24, 0, Math.cos(t) * 20);
    fox.lookAt(Math.sin(t + 0.05) * 24, 0, Math.cos(t + 0.05) * 20);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
