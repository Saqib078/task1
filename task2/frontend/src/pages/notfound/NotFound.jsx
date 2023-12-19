import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function NotFound() {
  const container = useRef();
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.current.appendChild(renderer.domElement);

    // Create a rotating planet
    const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00bfff });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Create background stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 }); // Increased star size by 5%
    const starsVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Create a moon
    const moonGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(2, 0, 0);
    scene.add(moon);

    camera.position.z = 5;
    // Update mouse position
    const onMouseMove = (event) => {
      mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Function to animate the stars
    const animateStars = () => {
      starsGeometry.attributes.position.array.forEach((pos, index) => {
        starsGeometry.attributes.position.array[index] += 0.01; // Adjust the speed as needed
        if (index % 3 === 0 && starsGeometry.attributes.position.array[index] > 200) {
          starsGeometry.attributes.position.array[index] = -200;
        }
      });
      starsGeometry.attributes.position.needsUpdate = true;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      planet.rotation.x += 0.001;
      planet.rotation.y += 0.001;

      animateStars(); // Call the stars animation

      // Move stars based on mouse position
      stars.position.x = mouseX.current * 10;
      stars.position.y = mouseY.current * 10;

      moon.rotation.x += 0.005;
      moon.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();
    moon.position.set(2, 0, 0);
    scene.add(moon);

    // Create a circle (circlePlanet)
    const circleGeometry = new THREE.CircleGeometry(1, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const circlePlanet = new THREE.Mesh(circleGeometry, circleMaterial);
    circlePlanet.position.set(4, 0, 0); // Adjust the position as needed
    scene.add(circlePlanet);

    camera.position.z = 5;

    // Update mouse position (same as your code)

    // Function to animate the stars (similar to your existing code)

  }, []);

  return <div className="App" ref={container}></div>;
}

export default NotFound;
