
// Imports START
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// Imports END





// Settings START
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0,2,5);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xfffff);

const ambientLight = new THREE.AmbientLight(0x404040, 3);

const gridHelper = new THREE.GridHelper(2000, 500);

var positionTween = new TWEEN.Tween(camera.position).easing(TWEEN.Easing.Quadratic.InOut);
var rotationTween = new TWEEN.Tween(camera.rotation).easing(TWEEN.Easing.Quadratic.InOut);


var buttonCameraSettings = {
    button1: {
        position: {
            x: 0,
            y: 0,
            // negative z for into the screen
            z: -30,
        },
        rotation: {
            x: 0,
            //Change y for looking horizontally
            y: 2,
            z: 0
        }
    }
}

//Moving camera on scroll

var button1 = document.getElementById('button1');
button1.addEventListener('click', function (e) {
    var buttonId = e.target.id;
    var cameraSettings = buttonCameraSettings[buttonId];

    updateCameraTweens(cameraSettings);
});


function updateCameraTweens(params) {
    if (params.position) {
        positionTween.stop();
        positionTween.to(params.position, 1000).start();

        
    }
    if (params.rotation) {
        rotationTween.stop();
        rotationTween.to(params.rotation, 1000).start();
    }
}

//fading objects in







//adding to scene

scene.add(gridHelper);

scene.add(ambientLight);

scene.add(pointLight);


//resizing renderer on screen resize

function resize_renderer() {
    var factor = 1; // percentage of the screen
    var w = window.innerWidth * factor;
    var h = window.innerHeight * factor;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
};

//resizing renderer on screen resize

window.addEventListener("resize", resize_renderer);

//const controls = new OrbitControls(camera, renderer.domElement);
//controls.target.set(1, 1, 0);
//controls.update();
//controls.enablePan = false;
//controls.enableDamping = true;


// Settings END

// Background image set START

const background = new THREE.TextureLoader().load('./pexels-mudassir-ali-2680270.jpg')

scene.background = background;

// Background image END

// Objects START

const geo_square = new THREE.BoxGeometry(10, 10, 10);
const mat_square = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    
});
const square = new THREE.Mesh(geo_square, mat_square);




scene.add(square);

square.position.set(0, 0, -25)












// Objects END



// Move camera function

function moveCamera(ev) {
//    const t = document.body.getBoundingClientRect().top;
//    square.rotation.x += 0.05;
//    square.rotation.y += 0.075;
 //   square.rotation.z += 0.05;

 //   camera.position.  t * -0.01;

  
 //   camera.position.x = 10 - window.scrollY / 1000.0;
    camera.position.z = 10 - window.scrollY / 500.0;
}



window.addEventListener("scroll", moveCamera);






//Animation/Renderer START

function animate() {
    requestAnimationFrame(animate);


    TWEEN.update();


   // controls.update();

    renderer.render(scene, camera);


}

animate();

//Animation/Renderer END