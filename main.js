import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

let loader = new THREE.TextureLoader();
const projTexture1 = loader.load("proj1.png");
const projTexture2 = loader.load("proj2.png");
const projTexture3 = loader.load("proj3.png");
const floorTexture4 = loader.load("woodenfloor.jpeg");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  1,
  1000,
  0.1
);

camera.position.z = 150;
camera.position.y = 75;
camera.position.x = 35;

scene.add(camera);

const gridHelper = new THREE.GridHelper(100);
// scene.add(gridHelper);

const OC = new OrbitControls(camera, renderer.domElement);
OC.update();

const gltfLoader = new GLTFLoader();
let donut;
gltfLoader.load("uglyfinisheddonut.glb", (img) => {
  console.log(img);

  img.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  scene.add(img.scene);
  img.scene.scale.x = 25;
  img.scene.scale.y = 35;
  img.scene.scale.z = 35;
  img.scene.castShadow = true;
  img.scene.receiveShadow = true;
  donut = img.scene;
  donut.position.y = 15;
});

const spotLight = new THREE.SpotLight("white", 0.8);
spotLight.position.y = 55;
spotLight.castShadow = true;
scene.add(spotLight);

spotLight.shadow.mapSize.width = 622; // default
spotLight.shadow.mapSize.height = 622; // default
spotLight.shadow.camera.near = 0.5; // default
spotLight.shadow.camera.far = 500;

const hemiLight = new THREE.HemisphereLight("white", "green", 0.3);
hemiLight.position.y = 55;
hemiLight.castShadow = true;
scene.add(hemiLight);

// const spot2Light = new THREE.SpotLight();
// spot2Light.position.y = 55;
// spot2Light.position.z = 55;
// spot2Light.castShadow = true;
// scene.add(spot2Light);

const boxGeo = new THREE.BoxGeometry(15, 25, 5);
const boxMaterial = new THREE.MeshLambertMaterial({
  color: "white",
  map: projTexture1,
});
const box1 = new THREE.Mesh(boxGeo, boxMaterial);
box1.position.x = -35;
box1.position.y = 25;
box1.position.z = -25;
box1.castShadow = true;
scene.add(box1);

const box2Material = new THREE.MeshLambertMaterial({
  color: "white",
  map: projTexture2,
});
const box2 = new THREE.Mesh(boxGeo, box2Material);
box2.position.x = 0;
box2.position.y = 25;
box2.position.z = -25;
box2.castShadow = true;
scene.add(box2);

const box3Material = new THREE.MeshLambertMaterial({
  color: "white",
  map: projTexture3,
});
const box3 = new THREE.Mesh(boxGeo, box3Material);
box3.position.x = 35;
box3.position.y = 25;
box3.position.z = -25;
box3.castShadow = true;
scene.add(box3);

const floorGeo = new THREE.BoxGeometry(100, 100, 10);
const floorMaterial = new THREE.MeshLambertMaterial({
  color: "white",
  map: floorTexture4,
});
const floor = new THREE.Mesh(floorGeo, floorMaterial);
floor.receiveShadow = true;
floor.rotation.x = Math.PI * -0.5;
scene.add(floor);

const floor2Geo = new THREE.PlaneGeometry(135, 135, 5);
const floor2Material = new THREE.MeshLambertMaterial({
  color: "white",
  // map: floorTexture4,
});
const floor2 = new THREE.Mesh(floor2Geo, floor2Material);
floor2.receiveShadow = true;
floor2.rotation.x = Math.PI * -0.5;
floor2.position.y = -0.5;
scene.add(floor2);

function animation() {
  renderer.render(scene, camera);
  if (donut?.rotation) {
    donut.rotation.x += 0.01;
    donut.rotation.y += 0.01;
    donut.rotation.z += 0.01;
  }

  requestAnimationFrame(animation);
}

animation();

onresize = (e) => {
  renderer.setSize(innerWidth, innerHeight);
};
