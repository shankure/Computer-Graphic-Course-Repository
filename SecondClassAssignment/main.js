import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a); // Darker gray for contrast

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 4, 6); // Higher and farther for better view

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);

// Floor (Plane)
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa }); // Light gray, realistic
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Lay flat
plane.position.y = -1; // Below objects
plane.receiveShadow = true; // Plane catches shadows
scene.add(plane);

// Geometry 1: Sphere
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Smoother sphere
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xff3333, // Vibrant red
  roughness: 0.5,
  metalness: 0.2,
  wireframe: true, // Wireframe to make rotation obvious
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-2, 0, 0); // Left side
sphere.castShadow = true; // Casts shadows
scene.add(sphere);

// Geometry 2: Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x33ff33, // Vibrant green
  roughness: 0.5,
  metalness: 0.2,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 0, 0); // Center
cube.castShadow = true;
scene.add(cube);

// Geometry 3: Cylinder
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32); // Smoother cylinder
const cylinderMaterial = new THREE.MeshStandardMaterial({
  color: 0x3333ff, // Vibrant blue
  roughness: 0.5,
  metalness: 0.2,
});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(2, 0, 0); // Right side
cylinder.castShadow = true;
scene.add(cylinder);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Bright directional light
directionalLight.position.set(5, 5, 5); // Position for better shadow angles
directionalLight.castShadow = true;
scene.add(directionalLight);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  // Rotate all objects on both y and x axes
  sphere.rotation.y += 0.05; // Faster rotation for clarity
  sphere.rotation.x += 0.03; // Increased x-axis rotation
  cube.rotation.y += 0.05;
  cube.rotation.x += 0.03;
  cylinder.rotation.y += 0.05;
  cylinder.rotation.x += 0.03;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
