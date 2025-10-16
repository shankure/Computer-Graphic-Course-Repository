import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

const gui = new GUI();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene setup
const scene = new THREE.Scene(); // scene constructor
scene.background = new THREE.Color(0x1a1a1a); // updated to match first code

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);

camera.position.set(1, 1, 4); // updated to match first code
scene.add(camera);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
// renderer.shadowMap.enabled = true; // uncomment if you want to enable shadows
document.body.appendChild(renderer.domElement);

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
scene.add(hemisphereLight);

const hemisphereLighthelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
scene.add(hemisphereLighthelper);

// Point light
const pointlight = new THREE.PointLight(0xff9000, 1.5, 0, 2);
pointlight.position.set(1, -0.5, 1);
scene.add(pointlight);

const pointlightHelper = new THREE.PointLightHelper(pointlight, 0.2);
scene.add(pointlightHelper);

// Area light
const reactAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 3, 3);
scene.add(reactAreaLight);

const rectAreaLightHelper = new RectAreaLightHelper(reactAreaLight);
scene.add(rectAreaLightHelper);

// Spot light
const spotLight = new THREE.SpotLight(0x7800ff, 60, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
spotLight.target.position.x = -0.75;
scene.add(spotLight);
scene.add(spotLight.target);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// Material
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff }); // blue color
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -2;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);
cube.position.x = 0;
cube.castShadow = true; // from first code
cube.receiveShadow = true; // from first code

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 2;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

// Resize listener
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix(); // Important!
  renderer.setSize(sizes.width, sizes.height);
});

// OrbitControls
const constrols = new OrbitControls(camera, renderer.domElement);
constrols.enableDamping = true;
constrols.dampingFactor = 0.25; // added from first code
constrols.screenSpacePanning = false; // added from first code

// Lights from second code
const ambientLight = new THREE.AmbientLight(0xffc0cb, 1);
scene.add(ambientLight);
gui.add(ambientLight, "intensity").min(0).max(10).step(0.001);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// Animation loop
function animate() {
  // Rotate the cube for some animation
  cube.rotation.x += 0.01; // added from first code
  cube.rotation.y += 0.01; // added from first code

  // Update controls
  constrols.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
