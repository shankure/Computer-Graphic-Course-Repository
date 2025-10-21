import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Define the size object with both width and height
const sizes = {
  width: 800, // Use the full window width
  height: 600, // Set height to 600 as specified
};

// Cursor object to track mouse movement
const cursor = { x: 0, y: 0 };

// Event listener to update cursor position
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

// Optional: Update the sizes when the window is resized
// window.addEventListener('resize', () => {
//     sizes.width = window.innerWidth;
//     sizes.height = window.innerHeight;
//     // Optionally, adjust the camera and renderer for the new window size
// });

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);

scene.add(mesh);

// const camera = new THREE.PerspectiveCamera(
//   75, //FOV (degrees)
//   sizes.width / sizes.height, //Aspect Ratio
//   0.1, //Near clipping plane
//   100 //Far clipping plane
// );
// camera.position.z = 3;

const aspectRatio = sizes.width / sizes.height;

const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio, //left
  1 * aspectRatio, //right
  1, //top
  -1, //bottom
  0.1, //near clipping plane
  100 //far clipping
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});
