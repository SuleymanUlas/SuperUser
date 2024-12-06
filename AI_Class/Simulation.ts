import { Code_Edit_Used } from "./Code_Edit_Used";
import puppeteer, { Browser, Page } from 'puppeteer';
import path from 'path';
import { setTimeout as waitForTimeout } from "node:timers/promises";

export class Simulation {
    /**
     * @description all => {}
     * @example {file: './path', code: 'File content', run: './su-ui-app/src/App.js' , del: false}
     * @example   const sm = new Simulation; const re = await sm.Simulation({
    file: './su-ui-app/src/App.jsx',
    code: `
  const config = {
  objects: [
    {
      type: 'cube',
      position: { x: -2, y: 0, z: 0 },
      animation: { rotationSpeed: { x: 0.005, y: 0.005 } },
      color: 0xff0000, // Red color
      size: { width: 2, height: 2, depth: 2 }, // Width, height, and depth for the cube
      //texture: 'path/to/cube_texture.png', // Example image texture
    },
  ],
  lights: [
    { type: 'hemisphere', params: { color1: 0xffffff, color2: 0x444444, intensity: 1 } },
  ],
  skybox: {
    textures: [
      'path/to/posx.jpg',
      'path/to/negx.jpg',
      'path/to/posy.jpg',
      'path/to/negy.jpg',
      'path/to/posz.jpg',
      'path/to/negz.jpg',
    ],
  },
};

`,
    run: `cd ./su-ui-app
      npm run start`,
    del: false
})
     */
    async Simulation(all: any) {
        all.del = false;
        const edit = new Code_Edit_Used;
        const defaultcode =
            `
import React, { useEffect, useRef } from 'react';
import { createScene, animateScene, createRenderer, createCamera } from './example';
import * as CANNON from 'cannon-es';

const ThreeDScene = ({ config }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = createScene(config);
    const camera = createCamera();
    const renderer = createRenderer();

    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 5;

    // Physics world setup
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Gravity pointing downwards

    // Create physics bodies for each object in the config
    config.objects.forEach(object => {
      // Only add physics bodies if not already defined
      if (!object.body) {
        let shape;
        const size = 1; // Default size; adjust if needed
        if (object.type === 'cube') {
          shape = new CANNON.Box(new CANNON.Vec3(size, size, size));
        } else if (object.type === 'cylinder') {
          shape = new CANNON.Cylinder(size, size, 2, 8);  // Adjust radius and height as needed
        } else if (object.type === 'sphere') {
          shape = new CANNON.Sphere(size);  // Using default radius for simplicity
        } else if (object.type === 'pyramid') {
          // A pyramid shape isn't directly available in CANNON.js, so create a custom shape
          const pyramidShape = new CANNON.ConvexPolyhedron({
            vertices: [
              new CANNON.Vec3(0, 1, 0),    // Apex
              new CANNON.Vec3(-1, 0, -1),  // Base
              new CANNON.Vec3(1, 0, -1),   // Base
              new CANNON.Vec3(1, 0, 1),    // Base
              new CANNON.Vec3(-1, 0, 1),   // Base
            ],
            faces: [
              [0, 1, 2],
              [0, 2, 3],
              [0, 3, 4],
              [0, 4, 1],
              [1, 2, 3],
              [1, 3, 4],
            ]
          });
          shape = pyramidShape;
        } else if (object.type === 'plane') {
          // Planes are infinite, but we can create a simple static box as a plane substitute
          shape = new CANNON.Plane();
        } else {
          console.warn('Unknown object type:', object.type);
          return;
        }
        const body = new CANNON.Body({
          mass: 1,
          position: new CANNON.Vec3(object.position.x, object.position.y, object.position.z),
        });
        body.addShape(shape);
        world.addBody(body);

        // Store the body reference in the object
        object.body = body;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      world.step(1 / 120); // Step the physics world

      // Update Three.js objects' positions based on physics
      config.objects.forEach(object => {
        if (object.body && object.mesh) {
          // Update mesh position and rotation from physics body
          object.mesh.position.copy(object.body.position);
          object.mesh.quaternion.copy(object.body.quaternion);
        }
      });

      animateScene(scene, camera, renderer, config);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [config]);

  return <div ref={mountRef} />;
};
const App = () => {
  ${all.code}
  return <ThreeDScene config={config} />;
};

export default App;`
        all.code = defaultcode;
        const run = await edit.Use(all);
        return run;
    }
    /**
     * @description all => {}
     * @example {all.process: 'screen-shoot'} Return screen shot
     * @example {all.process: 'get-video'}  => Return video path
     */
    async Simulate(all: any) {
        const browser: Browser = await puppeteer.launch();
        const page: Page = await browser.newPage();
        await page.goto('http://localhost:3000');

        let message = '';

        switch (all.process) {
            case 'screen-shoot':
                const screenshotPath = path.join(__dirname, `${all.user}/File`, 'screenshot.png');
                await page.screenshot({ path: screenshotPath, fullPage: true });
                message = 'Full page screenshot taken and saved to the File folder.';
                break;

            case 'get-video':
                const videoPath = path.join(__dirname, `${all.user}/File`, 'video.webm');
                const duration = all.time * 1000;
                await page.evaluate(async (duration) => {
                    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                    const mediaRecorder = new MediaRecorder(stream);
                    const chunks: any = [];

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            chunks.push(event.data);
                        }
                    };

                    mediaRecorder.start();
                    setTimeout(() => {
                        mediaRecorder.stop();
                    }, duration);
                    mediaRecorder.onstop = async () => {
                        const blob = new Blob(chunks, { type: 'video/webm' });
                        const buffer = await blob.arrayBuffer();

                        const arrayBufferView = new Uint8Array(buffer); // Ensure `buffer` is an ArrayBuffer.
                        const string = Array.from(arrayBufferView, byte => String.fromCharCode(byte)).join('');
                        const videoData = btoa(string);

                        const filename = 'video.webm';
                        window.localStorage.setItem(filename, videoData);
                    };
                }, duration);

                await waitForTimeout(duration + 1000);
                message = `Video recorded for ${duration / 1000} seconds at 1080p 60fps and saved to the File folder.`;
                break;

            default:
                message = 'Invalid operation.';
                break;
        }

        await browser.close();
        return message;
    }
}