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

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cubeMesh = new THREE.Mesh(geometry, material);
//scene.add(cubeMesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper); //y-green x-red, z-is hidden because it is allgined with the camera

//cubeMesh.scale.x = 2;
//cubeMesh.scale.y = 1;
//cubeMesh.scale.z = 0.5;

//Rotation
//cubeMesh.rotation.x = Math.PI * 0.25;
//cubeMesh.rotation.y = Math.PI * 0.25;

//Combining transformations
cubeMesh.scale.x = 4;
cubeMesh.scale.y = 2;
cubeMesh.rotation.x = Math.PI * 0.25;

function animate() {
  requestAnimationFrame(animate);

  // cubeMesh.rotation.x += 0.01;
  // cubeMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Cube 2
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // blue
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 5; // move it to the right;
//scene.add(cube2);

const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

cube1.position.x = -1.5;
group.add(cube1);

cube2.position.x = 0; // move it to the left
group.add(cube2);

cube3.position.x = 3;
group.add(cube3);
/*import * as THREE from 'three';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);*/
