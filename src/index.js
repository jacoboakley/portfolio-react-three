import * as THREE from 'three';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var height = window.innerHeight,
    width = window.innerWidth;

// 3 must haves - SCENE , CAMERA, RENDERER

var scene = new THREE.Scene(); // Creates a new scene

var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 ); // Creates a camera and passes (field of view, aspect ratio, near clipping plane, far clipping plane)
      camera.position.set(0, 50, 50);// moves the camera back some so we won't be inside of the cube
      camera.lookAt( scene.position ); // makes the camera always point toward the scene
      scene.add(camera);

var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height ); // sets size of render to the screen size
    renderer.setClearColor( 0x2c3e50 );
    document.body.appendChild( renderer.domElement); // Renders a canvas tag to the DOM

// Add axsis for visualiztion purposes
var axisHelper = new THREE.AxisHelper( 500 );
scene.add( axisHelper );

// Adds gridlines to help with layout
var gridHelper = new THREE.GridHelper( 100, 50 );
scene.add( gridHelper );


// Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
// order to add materials: x+,x-,y+,y-,z+,z-
// rendered front side only to increase performance
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333, side: THREE.FrontSide } ) ); // Right of Cube
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800, side: THREE.FrontSide } ) ); // Left of Cube
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x7f8d8d, side: THREE.FrontSide } ) ); // Top of Cube
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x7f6f8d, side: THREE.FrontSide } ) ); // Bottom of Cube
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff, side: THREE.FrontSide } ) ); // Front of cube
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff, side: THREE.FrontSide } ) ); // Back of cube

var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
// Cube parameters: width (x), height (y), depth (z),
//        (optional) segments along x, segments along y, segments along z
var cubeGeometry = new THREE.CubeGeometry( 10, 10, 10);
// using THREE.MeshFaceMaterial() in the constructor below
//   causes the mesh to use the materials stored in the geometry
var cube = new THREE.Mesh( cubeGeometry, cubeMaterials );
scene.add( cube);

// Render loop to animate cube
function render() {
  requestAnimationFrame( render ); // requestAnimationFrame will pause when the user navigates to a new tab
  cube.rotation.z += 0.01;  // Runs every frame giving it the animation
  cube.rotation.x += 0.01;  // Runs every frame giving it the animation
  cube.rotation.y += 0.01;  // Runs every frame giving it the animation
  renderer.render( scene, camera );
};

render();

// Add react elements for the ui

var Header = React.createClass ({
  render: function() {
    return (
      <div className='header'>
        <div className='card'>
          <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/760100/profile/profile-80_1.jpg' alt='Self' className='profile'/>
          <div className='title'>
            <h3>Name: <span>Jacob Oakley</span></h3>
            <h3>Class: <span>Developer</span></h3>
            <h3>Specialty: <span>Front-End</span></h3>
            <div className='skills'>
              <span data-tooltip='Bootstrap / Foundation'><img src='http://www.freeiconspng.com/uploads/w3c-html5-logo-0.png' alt='HTML5' /></span>
              <span data-tooltip='React / Three.js / Node'><img src='http://i.stack.imgur.com/Mmww2.png' alt='JavaScript' /></span>
              <span data-tooltip='Sass'><img src='http://megaicons.net/static/img/icons_sizes/6/58/256/css-3-icon.png' alt='CSS3' /></span>
            </div>
          </div>
        </div>
        <div className='help'>
        <p data-tooltip='This is where I will put any instructions needed for the page'>?</p>
        </div>
      </div>
    )
  }
});

var Footer = React.createClass ({
  render: function() {
    return (
      <div className='footer'>
        <h3>
          <a href='https://twitter.com/jacoboakley21' target='_blank'>Stalk Me</a> /
          <a href='http://codepen.io/jacoboakley/' target='_blank'> Judge Me</a> /
          <a href='https://github.com/jacoboakley' target='_blank'> Copy Me</a> /
          <a href='https://www.linkedin.com/in/jacoboakley' target='_blank'> Hire Me</a>
        </h3>
      </div>
    )
  }
});


var Main = React.createClass ({
  render: function() {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    )
  }
});

ReactDOM.render(<Main />, document.getElementById('root'));
