import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Create a Group to contain the shapes
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

// Sphere Geometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Radius, width segments, height segments
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red color
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = -3; // Position the sphere to the left
group.add(sphere);

// Cone Geometry
const coneGeometry = new THREE.ConeGeometry(1, 2, 32); // Radius, height, radial segments
const coneMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green color
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.x = 0; // Position the cone at the center
group.add(cone);

// Cylinder Geometry
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32); // Radius top, radius bottom, height, radial segments
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue color
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.x = 3; // Position the cylinder to the right
group.add(cylinder);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
