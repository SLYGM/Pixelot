# [Engine Documentation](docs/modules.md)

# [Download Pixelot](https://github.com/SLYGM/RetroEngineTM/releases/tag/Release)

# Pixelot
Pixelot is an ECS-based 2D game engine designed to streamline the creation of retro-styled games, through pixel-perfect rendering and provided retro-style shaders.

## ECS
Pixelot uses an Entity-Component-System architecture to manage game objects. This allows for a more modular approach to game development, and makes it easier to create and reuse components.  
This architecture works by having a collection of **entities**, each of which can have a collection of **components**. Each component can have an associated **system** which handles the logic for that component.  
Pixelot takes a hybrid approach to ECS by also having each entity have an associated script, which can be used to handle logic that should be unique to that entity. Additionally, each component has an object-oriented interface, which can be used to access and modify the component's data in an intuitive way.  
As a user, you can freely create your own entities, components, systems, and shaders, or you can use the ones provided by Pixelot.

## The Interface
Upon creating or opening a project you will be greeted by the main Pixelot interface:
![Screenshot 2023-03-30 155255](https://i.imgur.com/jtzaOx3.png)
In the centre you will see the main viewport, which is where you will be able to see your game as you develop it, as well as run the scene in the editor.  
On the left you will see the list of **layers** and entities that are contained in them. The layers are used to control the rendering order of the entities. From here you can create/delete layers and entities, and drag and drop entities to change their layer. The left sidebar also contains the 'Shaders' tab which allows you to add and modify shaders.  
On the right you will see the inspector. This is where you can modify the properties of the currently selected entity. This includes configuring the entity arguments and components. The left sidebar also contains a 'Systems' tab, which allows you to configure the arguments for systems.
At the bottom of the interface you will find the file manager, which allows you to view and modify the contents of your project. If you ever modify the contents of the project outside of the editor, you can use the refresh button to update the file manager.  
At the top is the scene bar, which allows you to switch between scenes and create new ones.  
You can also use the menu bar at the top to open/create projects as well as build your game.

## Scripts
Scripts are used to add custom logic to entities. They are written in **JavaScript** and can be created through the file manager. The button highlighted below will create a new script in the currently selected folder, after selecting the script type.
![newscript](https://i.imgur.com/AKfrhFZ.png)
Scripts in Pixelot are written in a similar way to Unity's MonoBehaviour scripts. Each script is a class which extends from a base class in the Pixelot engine. The base class provides a number of useful functions which can be overridden to add custom logic to the script. To interface with the engine from any script, you can use the `engine` global variable. The full documentation for the engine can be found [here](docs/modules.md).

### Script Arguments
Each script can have a number of arguments (to the `onCreate`/`constructor`, depending on whether it is an entity script or not), which can be accessible through the editor. In order to have this functionality, you must add static `arg_names` and `arg_types` arrays, which are `string` and [`engine.Types`](docs/classes/Types.md) arrays respectively. The `arg_names` array contains the names of the arguments, and the `arg_types` array contains the types of the arguments. The order of the arguments in each array must match.

> Note that the arguments are only necessary for objects you wish to create in the editor. If you wish to create an object programmatically, you can simply pass the arguments to the [`scene.addEntity`](docs/classes/Scene.md#L48) function, and these can be of **any** type.

### Entity Scripts
Entity scripts are scripts which are attached to entities. When creating a new entity, you must select the script that you want to use for that entity. Entity scripts must extend from the [`GameObjectBase`](docs/classes/GameObjectBase.md) class. The `GameObjectBase` class provides a number of useful functions which can be overridden:
* `onCreate`: Called when the entity is added to a scene.
* `update(dt)`: Called every frame.
* `onDelete`: Called when the entity is removed from a scene.

> It is important that you do **not** override the `constructor` function, as this is used by the engine to create the entity.

Within an entity script you can also access the entity's components as properties of the obejct. In the example below, we access the 'Velocity' component of the entity as `this.velocity`:
```js
class Player extends engine.GameObjectBase {
  static arg_names = ["Jump Speed"];
  static arg_types = [engine.Types.Number];

  times_jumped;
  onCreate(jump_speed) {
    this.jump_speed = jump_speed;
    this.times_jumped = 0;
  }
  update() {
    if (engine.KeyStates.isPressed("Space")) {
      this.Velocity.y = this.jump_speed;
      this.times_jumped++;
    }
  }
}
```

### Component Scripts
Component scripts define custom components which can be added to entities, either programmatically or through the editor. Component scripts must extend from the [`Component`](docs/classes/Component.md) class. The `Component` class provides a number of useful functions which can be overridden:
* `onCreate`: Called when the owner of the component is added to a scene.
* `onDelete`: Called when this component is removed or the owner is deleted.

Additionally, components have a `owner` property available which can be used to access the entity that owns the component.  
The component may also have a list of dependency components stored in the `dependencies` array. This is used to ensure that the component is only added to an entity if it has all of the required components. For example, the `Velocity` component has a dependency on the `Position` component.

This is an example of a Position component:
```js
class Position extends engine.Component {
  static arg_names = ["x", "y"];
  static arg_types = [engine.Types.Number, engine.Types.Number];

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}
```

### System Scripts
System scripts define custom systems which can be added to scenes which act on a component. Systems are added to a scene automatically if an entity with the desired component is added to the scene. They can also be added manually through the [`Scene`](docs\classes\Scene.md) or [`SceneManager`](docs\classes\SceneManager.md) class.
> Note that currently the system name must match the component name to be added automatically.
> 
System scripts must extend from the [`System`](docs/classes/System.md) class. The `System` class provides the `update(entities)` function which is called every frame. The `entities` parameter is an array of entities which have the component that the system is associated with. To define the component that the system is associated with, you must set the `component` property of the class to the component class.

An example of a Velocity system is shown below:
```js
import VelocityComponent from "./Velocity.js";
class Velocity extends engine.System {
  static arg_names = [];
  static arg_types = [];
  component = VelocityComponent;
  
  update(entities) {
    entities.forEach(entity => {
        entity.Position.x += entity.Velocity.x;
        entity.Position.y += entity.Velocity.y;
    });
  }
}
```

### Shader Scripts
Custom shaders can be created by extending the [`PostProcess`](docs/classes/PostProcess.md) class. In order to instantiate a shader, you must use the super constructor for `PostProcess`, which takes as arugment a vertex and fragment shader as strings. Additionally, the class provides a `draw()` function which is called each frame when applying the shader. This is where you will implement any required setup for the shader drawing logic. The default implementation simply draws a quad with the shader applied. Here it will be useful to access the global variable `engine.$gl` which is a reference to the WebGL2 context. 
 This shader can then be added through the [`PostProcessing`](docs\classes\PostProcessing.md) class.

This is an example shader which will colour the left half of the screen in red:
```js
export default class HalfScreenShader extends engine.PostProcess {
    static arg_names = [];
    static arg_types = [];

    constructor() {
        const v_shader = `#version 300 es

    in vec4 a_position;

    out vec2 v_texcoord;

    void main() {
      gl_Position = a_position * vec4(2, 2, 1, 1) - vec4(1, 1, 0, 0);
      v_texcoord = a_position.xy;
    }
    `;

        const f_shader = `#version 300 es

    precision highp float;

    uniform sampler2D u_texture;
    in vec2 v_texcoord;

    out vec4 outColor;

    void main()
    {
        if (v_texcoord.x > 0.5) {
            outColor = texture(u_texture, v_texcoord);
        } else {
            outColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    }
    `;
        super(v_shader, f_shader);
    }
    draw() {
        engine.$gl.drawArrays(engine.$gl.TRIANGLES, 0, 6);
    }
}
```

## Prefabs
When creating entities it can be useful to avoid having to add all the desired components manually, especially when creating an entity programmatically. Prefabs are a way of defining an entity base class with an associated list of components. A prefab can be created through the editor by pressing the 'Save as Prefab' button on the right sidebar. Then, when creating a new entity you can select the prefab from the dropdown menu. This will automatically add all the components from the prefab to the entity. Additionally, you can spawn a prefab programmatically through the `Scene` class using `spawnPrefab(prefab_name, args)`. The prefab will save all of the component arguments by default, but won't save the arguments for the entity itself. Prefabs can be particularly useful when creating instances of the same entity, such as creating bullets.

## Rendering
### Sprites
The main way to render images in Pixelot is to use the provided `Sprite` component, which takes as argument the path to the image file (which must be contained within the project folder). **The sprites will be drawn true to the size of the original image.** Sprites can also be rotated and have their rotation anchor point set.

### Layers
Rendering layers control the order in which sprites will be drawn. Layers are drawn in order from top to bottom, which means lower layers will appear over higher layers. New sprite layers can be added by click 'Add Layer' in the left sidebar and selecting the 'Sprite Layer'. When creating a sprite component, specify the name of the layer that the sprite should be drawn on. By default, newly added entities will be added to the 'No Layer' tab.  
Within the layers, the render order can be controlled through the sprite z-index, which is set through the `z_index` property of the sprite component. The default z-index is 0, and sprites with a higher z-index will be drawn on top of sprites with a lower z-index. 

### Text
To display text use the `Text` component, which takes as argument the text to be displayed. Currently there is no support for using custom fonts, but the engine has some built in fonts. Which font to use can also be specified as an argument to the `Text` component.  
**The fonts available are:**
- default
  
### Tilemaps
Pixelot supports rendering tilemap layers. Tilemaps should be created in 'Tiled' (https://www.mapeditor.org/). In order to export in the correct format, ensure that the tilesets are embedded in the `json` file (can be toggled when opening a tileset in Tiled). Additionally, make sure to export it directly into the projects directory, as Tiled will configure the paths to the tilesets relative to the `json` file. As such, also make sure that the tileset images are being stored within the projects directory. **This means that if you want to move the location of the tilemap `.json`, or the tileset images, you should delete it and re-export from Tiled to ensure the relative paths stay valid**

Pixelot supports arbitrary layers and tilesets, but won't support any custom properties, or transparency colours set in Tiled. In order to add transparency, make tilesets with transparent backgrounds in an image editor, and then export them as `.png` files.

To retrieve objects from the object layer, use the `getObject` function of the `TileMapObjectLayer` class. 
To retrieve an object layer from the tilemap, use the `getObjectLayer` function of the `TileMapLayer` class.


### Shaders
Shaders can be added/removed through the 'Shaders' tab in the left sidebar. The shaders will be applied in the order they are listed, with the first shader being applied first. The shaders will be applied to the entire screen, and will be applied after the sprites have been drawn. This means that the shaders will be applied to the sprites as well. The shaders can be re-ordered by dragging and dropping them in the list. Here you can also configure any arguments that the shader takes. You can also hide the effects of the shader within the editor by clicking the 'Hide' button. This will have no effect on the built game itself.

## Sound
Sound can be played by creating an instance of the [`Sound`](docs\classes\Sound.md) class, and then using its associated `play()` method.  
This is an example entity script which will play a sound when the 'a' key is pressed:
```js
export default class Player extends engine.GameObjectBase {
    static arg_names = [];
    static arg_types = [];

    onCreate() {
        this.keyPressed = false;
        this.sound = new engine.Sound('./assets/sound/aeuuuh.wav');
    }

    update() {
        if (engine.KeyStates.isPressed("a")) {
            if (!this.keyPressed) {
                this.sound.play();
                this.keyPressed = true;
            }
            
        } else {
            this.keyPressed = false;
        }
    }
}
```

## Input
Pixelot can currently handle keyboard and mouse input, with support for gamepads planned for the future.
### Keyboard
Keyboard input can be accessed through the [`KeyStates`](docs\classes\KeyStates.md) class. This class provides a `isPressed(key)` function which returns true if the key is currently pressed. The `key` parameter is a string. The example in the [sound](#sound) section shows how to use this class to play a sound when a key is pressed.

### Mouse
Mouse input can be accessed through the [`MouseState`](docs\classes\MouseState.md) class. This class provides a `isPressed(button)` function which returns true if the mouse button is currently pressed. Additionally, it provides properties:
* `screen_pos` - the current position of the mouse in screen coordinates (wit h the origin in the top left)
* `world_pos` - the current position of the mouse in world coordinates

## Console Access
Within the Pixelot editor you can access the console at any time by pressing the F12 key. This will open the standard chrome console, which will have access to the `engine` object. This object contains all of the classes and functions that are available to you when writing scripts, i.e. you can access any of the engine's functionality through the console. The console can be used to test out code, or to debug your game.  
Simlarly, this console is also available for use when running a built game.

## Building and Deploying
To build a game in the editor, use Game->Build in the toolbar, as shown below:
![build](https://i.imgur.com/zNowHa6.png)  
This will prompt you to select a destination and build target, after which a folder will be created at the destination containing a game executable.
