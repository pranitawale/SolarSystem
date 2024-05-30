
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

scene.background = new THREE.TextureLoader().load('img/stars.jpg')
scene.background.minFilter = THREE.LinearFilter
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 200

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)
const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

const elements: THREE.Mesh[] = []
function create_object(radius: number, txt: string, position: number) {
  const geometry = new THREE.SphereGeometry(radius)
  const texture = new THREE.TextureLoader().load(txt)
  const material = new THREE.MeshBasicMaterial({ map: texture })
  const object = new THREE.Mesh(geometry, material)
  object.position.x = position
  elements.push(object)
}

create_object(4, 'img/sun.jpg', 0)              //sun
const pointLight = new THREE.PointLight(0xFFFFFF, 250000, 200000)
pointLight.position.set(0, 0, 0);
scene.add(pointLight);
pointLight.castShadow = true
scene.add(elements[0])

create_object(0.5, 'img/mercury.jpg', 7.5)      //mercury=elements[1]
create_object(0.8, 'img/venus_surface.jpg', 10.8)       //venus=elements[2]   
create_object(1.5, 'img/earth.jpeg', 16.1)       //earth=elements[3]
create_object(1, 'img/mars.jpg', 21.6)          //mars=elements[4]
create_object(2.5, 'img/jupiter.jpg', 26.6)     //jupiter=elements[5]
create_object(2, 'img/saturn.jpg', 34.1)        //saturn=elements[6]
create_object(1.8, 'img/uranus.jpg', 40.1)       //uranus=elements[7]
create_object(1.5, 'img/neptune.jpeg', 45.9)      //neptune=elements[8]
//create_object(0.3, 'img/moon.jpg', 2.5)

function rings(outer_radius: number, inner_radius: number, segments: number) {
  const ring_geometry = new THREE.RingGeometry(outer_radius, inner_radius, segments)
  const ring_material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
  const ring = new THREE.Mesh(ring_geometry, ring_material)
  scene.add(ring)
}
rings(7.5, 7.6, 64)
rings(10.8, 10.9, 64)
rings(16.1, 16.2, 64)
rings(21.6, 21.7, 64)
rings(26.6, 26.7, 64)
rings(34.1, 34.2, 64)
rings(40.1, 40.2, 64)
rings(45.9, 46, 64)

const mercury_obj = new THREE.Object3D()
mercury_obj.add(elements[1])
scene.add(mercury_obj)

const venus_obj = new THREE.Object3D()
venus_obj.add(elements[2])
scene.add(venus_obj)

const earth_obj = new THREE.Object3D()
earth_obj.add(elements[3])
scene.add(earth_obj)

const mars_obj = new THREE.Object3D()
mars_obj.add(elements[4])
scene.add(mars_obj)

const jupiter_obj = new THREE.Object3D()
jupiter_obj.add(elements[5])
scene.add(jupiter_obj)

const saturn_obj = new THREE.Object3D()
saturn_obj.add(elements[6])
scene.add(saturn_obj)

const uranus_obj = new THREE.Object3D()
uranus_obj.add(elements[7])
scene.add(uranus_obj)

const neptune_obj = new THREE.Object3D()
neptune_obj.add(elements[8])
scene.add(neptune_obj)

const moongeometry = new THREE.SphereGeometry(0.3)
const moonmaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('img/moon.jpg') })
const moon = new THREE.Mesh(moongeometry, moonmaterial)
const moonobj = new THREE.Object3D()
earth_obj.add(moonobj)
moonobj.position.x = 16.1
moonobj.add(moon)
moon.position.x = 2.5

elements[1].rotateY(0.01745)
elements[2].rotateY(3.089)
elements[3].rotateY(0.4014)
elements[4].rotateY(0.4363)
elements[5].rotateY(30.05235)
elements[6].rotateY(0.4712)
elements[7].rotateY(1.71042)
elements[8].rotateY(0.5235)

const sat_ring_geo = new THREE.RingGeometry(4, 2.8, 64)
const sat_ring_mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('img/saturn_ring.png') })
const sat_ring = new THREE.Mesh(sat_ring_geo, sat_ring_mat)
saturn_obj.add(sat_ring)
sat_ring.position.x = 34.1

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}
elements[5].rotation.x = 1.57
sat_ring.rotation.y = -0.75
function animate() {
  requestAnimationFrame(animate)
  elements[1].rotation.z += 0.3
  mercury_obj.rotation.z += 0.00479   //days complete round around sun
  venus_obj.rotation.z += 0.0035
  earth_obj.rotation.z += 0.00298
  mars_obj.rotation.z += 0.0024
  jupiter_obj.rotation.z += 0.0013
  saturn_obj.rotation.z += 0.000969
  uranus_obj.rotation.z += 0.000681
  neptune_obj.rotation.z += 0.000543

  elements[1].rotation.z += 0.0000108          //around itself
  elements[2].rotation.z += -0.00000652
  elements[3].rotation.z += 0.001574
  elements[4].rotation.z += 0.000866
  elements[5].rotation.y += 0.045583
  elements[6].rotation.z += 0.03684
  elements[7].rotation.z += -0.014794
  elements[8].rotation.z += 0.009719

  moonobj.rotation.z += 0.01
  render()
}

function render() {
  renderer.render(scene, camera)
}

animate()