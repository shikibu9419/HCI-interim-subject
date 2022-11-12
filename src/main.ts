import './style.css'
import * as BABYLON from "@babylonjs/core";
import '@babylonjs/loaders/glTF';

import desktopModel from '../models/desktop.glb?url';

window.onload = () => {
    const canvas = document.getElementById("render-canvas") as HTMLCanvasElement;

    if (canvas) {
        const engine = new BABYLON.Engine(canvas, true);
        const scene = createScene(canvas, engine);
  const folderName = desktopModel.split('/').slice(0, -1).join('/').concat('/');
  const fileName = desktopModel.split('/').slice(-1)[0];
          BABYLON.SceneLoader.AppendAsync(folderName, fileName, scene)
            .then(() => {
              console.log('model loaded');
            })
            .catch(console.error);

        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
                scene.render();
        });
        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
                engine.resize();
        });
    }
}

const createScene = function (canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    // Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);
    // Creates and positions a free camera
    const camera = new BABYLON.FreeCamera("camera1", 
        new BABYLON.Vector3(0, 5, -10), scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;
    // Built-in 'sphere' shape.
//     const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", 
//         {diameter: 2, segments: 32}, scene);
//     // Move the sphere upward 1/2 its height
//     sphere.position.y = 1;
    // Built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", 
        {width: 6, height: 6}, scene);
    return scene;
};

