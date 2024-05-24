/* MD
### ✂️ Cutting our scene with planes
---

  The Clipping Tool is a powerful feature in 3D modelling that helps you dissect 3D objects. Clipping Tool is useful for inspecting and analyzing objects in detail.💪

:::tip Clipping?

Clipping is the process of "cutting" a 3D object by creating a plane. That way, we can have a bird view of the inside of a BIM model.

:::

In this tutorial, we will import:

- `Three.js` to get some 3D entities for our app.
- `@thatopen/components` to set up the barebone of our app.
- `@thatopen/ui` to add some simple and cool UI menus.
- `Stats.js` (optional) to measure the performance of our app.

*/

import * as THREE from "three";
import Stats from "stats.js";
import * as BUI from "@thatopen/ui";
import * as OBC from "@thatopen/components";

/* MD
  ### 🌎 Setting up a simple scene
  ---

  We will start by creating a simple scene with a camera and a renderer. If you don't know how to set up a scene, you can check the Worlds tutorial.

*/

const container = document.getElementById("container")!;

const components = new OBC.Components();

const worlds = components.get(OBC.Worlds);
const world = worlds.create<
  OBC.SimpleScene,
  OBC.SimpleCamera,
  OBC.SimpleRenderer
>();

world.scene = new OBC.SimpleScene(components);
world.renderer = new OBC.SimpleRenderer(components, container);
world.camera = new OBC.SimpleCamera(components);

components.init();

world.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);

world.scene.setup();

/* MD

  We'll make the background of the scene transparent so that it looks good in our docs page, but you don't have to do that in your app!

*/

world.scene.three.background = null;

/* MD

  ### 🎲 Creating a Cube Mesh
  ---
  Let's start by adding a Cube, which we can dissect. We will create a [Cube](https://threejs.org/docs/index.html?q=box#api/en/geometries/BoxGeometry) with `3x3x3` dimensions and use purple color for the material.
*/

const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: "#6528D7" });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 1.5, 0);
world.scene.three.add(cube);
world.meshes.add(cube);

/* MD
  ### ⚡ Initializing the Raycaster
  ---
  We also need to initialize the Raycaster for this world so that the position of the mouse is tracked from the very first moment we use the clipping planes.
*/

const casters = components.get(OBC.Raycasters);
casters.get(world);

/* MD
  ### ⚙️ Adding the Clipper
  ---
  Here comes the interesting part, we will add a Simple Clipper to our scene. You can instantiate it, but it's always better to use the `components.get(OBC.Clipper)` method to get it. All components are meant to be used as a singleton per components instance, and using this system to get a component makes sure this happens.
*/

const clipper = components.get(OBC.Clipper);

/* MD

  :::info Controllign the plane

  Each plane generated by the clipper can be controlled using the built-in 3D arrows. You can control the activation and visibility of each plane using `plane.enabled` and `plane.visible`. To control the activation and visibility of all planes, use `clipper.enabled` and `clipper.visible`.

  */

clipper.enabled = true;

/* MD

  ### 🤝 Performing Clipping Events
  ---
  Now, we want a way to create a clipping plane on demand. You can do it with a `Single Click` or `Double Click` of a mouse. For this tutorial, we will use `Double Click`. This will cast a ray from the mouse position to the scene and check if the ray intersects with any of the 3D objects. If it does, it will create a new clipping plane in the point of intersection.

  */

container.ondblclick = () => clipper.create(world);

/* MD

  :::info Raycaster under the hood 🎩

  We use the Raycaster to determine if the intersection has occurred. The clipper places a plane after detecting the face on which the mouse was clicked. 😎

  :::

  ### 🧹 Deleting the Clipping Planes
  ---
  Now that we know how to make multiple clipping planes, we must also know how to delete them when necessary. Clipping planes can be removed using `clipper.delete(world)` (which will pick the first plane under the mouse using the raycaster in the specified world) or `clipper.delete(world, plane)` (which will delete a specific clipping plane).

  */

window.onkeydown = (event) => {
  if (event.code === "Delete" || event.code === "Backspace") {
    clipper.delete(world);
  }
};

/* MD

  :::tip Delete all the Clipping Planes
  ❎ If you want to safely delete all the clipping planes that were created you can simply call `clipper.deleteAll()`.
  :::

  ### ⏱️ Measuring the performance (optional)
  ---

  We'll use the [Stats.js](https://github.com/mrdoob/stats.js) to measure the performance of our app. We will add it to the top left corner of the viewport. This way, we'll make sure that the memory consumption and the FPS of our app are under control.

*/

const stats = new Stats();
stats.showPanel(2);
document.body.append(stats.dom);
stats.dom.style.left = "0px";
stats.dom.style.zIndex = "unset";
world.renderer.onBeforeUpdate.add(() => stats.begin());
world.renderer.onAfterUpdate.add(() => stats.end());

/* MD
  ### 🧩 Adding some UI
  ---

  We will use the `@thatopen/ui` library to add some simple and cool UI elements to our app. First, we need to call the `init` method of the `BUI.Manager` class to initialize the library:

*/

BUI.Manager.init();

/* MD
  Now we will create some UI elements and bind them to some of the controls of the clipper, like activation, visibility, size, color, etc. For more information about the UI library, you can check the specific documentation for it!
*/

const panel = BUI.Component.create<BUI.PanelSection>(() => {
  return BUI.html`
    <bim-panel label="Clipper Tutorial" class="options-menu">
          <bim-panel-section collapsed label="Commands">
      
        <bim-label label="Double click: Create clipping plane"></bim-label>
        <bim-label label="Delete key: Delete clipping plane"></bim-label>
       
        
      </bim-panel-section>
      <bim-panel-section collapsed label="Others"">
          
        <bim-checkbox label="Clipper enabled" checked 
          @change="${({ target }: { target: BUI.Checkbox }) => {
            clipper.enabled = target.value;
          }}">
        </bim-checkbox>
        
        <bim-checkbox label="Clipper visible" checked 
          @change="${({ target }: { target: BUI.Checkbox }) => {
            clipper.visible = target.value;
          }}">
        </bim-checkbox>
      
        <bim-color-input 
          label="Planes Color" color="#202932" 
          @input="${({ target }: { target: BUI.ColorInput }) => {
            clipper.material.color.set(target.color);
          }}">
        </bim-color-input>
        
        <bim-number-input 
          slider step="0.01" label="Planes opacity" value="0.2" min="0.1" max="1"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            clipper.material.opacity = target.value;
          }}">
        </bim-number-input>
        
        <bim-number-input 
          slider step="0.1" label="Planes size" value="5" min="2" max="10"
          @change="${({ target }: { target: BUI.NumberInput }) => {
            clipper.size = target.value;
          }}">
        </bim-number-input>
        
        <bim-button 
          label="Delete all" 
          @click="${() => {
            clipper.deleteAll();
          }}">  
        </bim-button>        
        
        <bim-button 
          label="Rotate cube" 
          @click="${() => {
            cube.rotation.x = 2 * Math.PI * Math.random();
            cube.rotation.y = 2 * Math.PI * Math.random();
            cube.rotation.z = 2 * Math.PI * Math.random();
          }}">  
        </bim-button>
       
        
      </bim-panel-section>
    </bim-panel>
    `;
});

document.body.append(panel);

/* MD
  And we will make some logic that adds a button to the screen when the user is visiting our app from their phone, allowing to show or hide the menu. Otherwise, the menu would make the app unusable.
*/

const button = BUI.Component.create<BUI.PanelSection>(() => {
  return BUI.html`
      <bim-button class="phone-menu-toggler" icon="solar:settings-bold"
        @click="${() => {
          if (panel.classList.contains("options-menu-visible")) {
            panel.classList.remove("options-menu-visible");
          } else {
            panel.classList.add("options-menu-visible");
          }
        }}">
      </bim-button>
    `;
});

document.body.append(button);

/* MD
  ### 🎉 Wrap up
  ---

  That's it! You have created your first clipping planes to cut your 3D models. You can now play with the inputs to see how the planes change and adapt them to the look of your app! If you liked planes, don't forget to check out the Edges Planes tutorial, who includes styles, edges and fills and much more.

*/
