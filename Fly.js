import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, airplane;

function initScene() {
    scene = new THREE.Scene();
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function loadAirplaneModel() {
    const loader = new GLTFLoader();
    loader.load('path/to/your/airplane_model.gltf', (gltf) => {
        airplane = gltf.scene;
        scene.add(airplane);
    });
}

function initKeyboardControls() {
    const keyStates = {};

    document.addEventListener('keydown', (event) => {
        keyStates[event.code] = true;
    });

    document.addEventListener('keyup', (event) => {
        keyStates[event.code] = false;
    });

    function handleKeyboardInput() {
        if (keyStates['ArrowUp'] && airplane.position.y < 2) airplane.position.y += 0.05;
        if (keyStates['ArrowDown'] && airplane.position.y > -2) airplane.position.y -= 0.05;
        if (keyStates['ArrowLeft'] && airplane.position.x > -2) airplane.position.x -= 0.05;
        if (keyStates['ArrowRight'] && airplane.position.x < 2) airplane.position.x += 0.05;
    }

    function animate() {
        requestAnimationFrame(animate);
        handleKeyboardInput();
        renderer.render(scene, camera);
    }

    animate();
}

function startApp() {
    initScene();
    initCamera();
    initRenderer();
    loadAirplaneModel();
    initKeyboardControls();
}

startApp();
