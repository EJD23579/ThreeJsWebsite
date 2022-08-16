
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
camera.position.set(-20,10,10);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xfffff);

const ambientLight = new THREE.AmbientLight(0x404040, 3);

const gridHelper = new THREE.GridHelper(2000, 500);

var positionTween = new TWEEN.Tween(camera.position).easing(TWEEN.Easing.Quadratic.InOut);
var rotationTween = new TWEEN.Tween(camera.rotation).easing(TWEEN.Easing.Quadratic.InOut);


var buttonCameraSettings = {
    button1: {
        position: {
            x: 10,
            y: 20,
            // negative z for into the screen
            z: 50,
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

const background = new THREE.TextureLoader().load('./paul-volkmer-qVotvbsuM_c-unsplash.jpg')

scene.background = background;

// Background image END

// Objects START

const geo_planet_main = new THREE.SphereGeometry(10);
const mat_planet_main = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
    
});
const planet_main = new THREE.Mesh(geo_planet_main, mat_planet_main);



const sphere_geo = new THREE.SphereGeometry(2);
const sphere_mat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true});
const moon_main = new THREE.Mesh(sphere_geo, sphere_mat);



planet_main.add(moon_main)

moon_main.position.set(-4, 0, -40)









scene.add(planet_main);

planet_main.position.set(0, 0, -25)












// Objects END



// Move camera function

function moveCamera(ev) {
//    const t = document.body.getBoundingClientRect().top;
//    square.rotation.x += 0.05;
//    square.rotation.y += 0.075;
 //   square.rotation.z += 0.05;

 //   camera.position.  t * -0.01;


 //   camera.position.x = 10 - window.scrollY / 1000.0;


    
    camera.position.y = 10 - window.scrollY / 5000.0;
    camera.position.z = 10 - window.scrollY / 250.0;

    camera.rotation.y = 0 - window.scrollY / 5000.0;
}



window.addEventListener("scroll", moveCamera);




//Animation/Renderer START

function animate() {
    requestAnimationFrame(animate);


    TWEEN.update();


    planet_main.rotation.x += 0.005;
    planet_main.rotation.y += 0.005;
    planet_main.rotation.z += 0.001;

    moon_main.rotation.x += 0.05;
    moon_main.rotation.y += 0.05;
    moon_main.rotation.z += 0.01;

    

    

   // controls.update();

    renderer.render(scene, camera);




}


animate();

//Animation/Renderer END