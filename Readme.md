# [Engine Documentation](docs/modules.md)

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
On the left you will see the list of **layers** and entities that are contained in them. The layers are used to control the rendering order of the entities. From here you can create/delete layers and entities, and drag and drop entities to change their layer.  
On the right you will see the inspector. This is where you can modify the properties of the currently selected entity. This includes configuring the entity arguments and components.
At the bottom of the interface you will find the file manager, which allows you to view and modify the contents of your project.  
At the top is the scene bar, which allows you to switch between scenes and create new ones.  
You can also use the menu bar at the top to open/create projects as well as build your game.

## Scripts
Scripts are used to add custom logic to entities. They are written in **JavaScript** and can be created through the file manager. The button highlighted below will create a new script in the currently selected folder, after selecting the script type.
![newscript](https://i.imgur.com/AKfrhFZ.png)
Scripts in Pixelot are written in a similar way to Unity's MonoBehaviour scripts. Each script is a class which extends from a base class in the Pixelot engine. The base class provides a number of useful functions which can be overridden to add custom logic to the script. To interface with the engine from any script, you can use the `engine` global variable. The full documentation for the engine can be found [here](docs/modules.md).

### Script Arguments
Each script can have a number of arguments, which can be accessible through the editor. In order to have this functionality, you must add static `arg_names` and `arg_types` arrays, which are `string` and `engine.Types` arrays respectively. The `arg_names` array contains the names of the arguments, and the `arg_types` array contains the types of the arguments. The order of the arguments in each array must match.

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
Component scripts define custom components which can be added to entities, either programmatically or through the editor. Component scripts must extend from the [`ComponentBase`](docs/classes/ComponentBase.md) class. The `ComponentBase` class provides a number of useful functions which can be overridden:
* `onCreate`: Called when the owner of the component is added to a scene.
* `onDelete`: Called when this component is deleted.

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
System scripts must extend from the [`SystemBase`](docs/classes/SystemBase.md) class. The `SystemBase` class provides the `update(entities)` function which is called every frame. The `entities` parameter is an array of entities which have the component that the system is associated with. To define the component that the system is associated with, you must set the `component` property of the class to the component class.

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