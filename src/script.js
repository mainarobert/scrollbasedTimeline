import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
//camera.position.x = 0
//camera.position.y = 0
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 4
controls.minDistance = 1


/**
 * Earth model
 */



/**
 * Sphere
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry( 1.5, 25, 16 ),
    new THREE.MeshNormalMaterial( {wireframe: true} )
)
scene.add(sphere)


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * GSAP Animate
 */
gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline({
    scrollTrigger:{
        scrub: 2,
        ease: 'expo',
        //markers: true,
        start: 'top 0%'
    }
})

tl.to(sphere.position, {x: 3})
tl.to(sphere.position,{x: 0, z: 2.3})


/**
 * Animate
 */
const clock = new THREE.Clock()
//let lastElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //const deltaTime = elapsedTime - lastElapsedTime
    //lastElapsedTime = elapsedTime

    sphere.rotation.y = elapsedTime * 0.07
    sphere.rotation.x = elapsedTime * 0.07
    sphere.rotation.z = elapsedTime * 0.07

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()