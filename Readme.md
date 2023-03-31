# [Documentation](docs/modules.md)

# Pixelot
Pixelot is an ECS-based 2D game engine designed to streamline the creation of retro-styled games, through pixel-perfect rendering and provided retro style shaders.

## ECS
Pixelot uses an Entity-Component-System architecture to manage game objects. This allows for a more modular approach to game development, and makes it easier to create and reuse components.  
This architecture works by having a collection of **entities**, each of which can have a collection of **components**. Each component can have an associated **system** which handles the logic for that component.  
Pixelot takes a hybrid approach to ECS by also having each entity have an associated script, which can be used to handle logic that should be unique to that entity. Additionally, each component has an object-oriented interface, which can be used to access and modify the component's data.  
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
Scripts are used to add custom logic to entities. They are written in JavaScript and can be created through the file manager. The button highlighted below will create a new script in the currently selected folder, after selecting the script type.
![newscript](https://i.imgur.com/AKfrhFZ.png)
Scripts in Pixelot are written in a similar way to Unity's MonoBehaviour scripts. Each script is a class which extends from a base class in the Pixelot engine. The base class provides a number of useful functions which can be overridden to add custom logic to the script. To interface with the engine from any script, you can use the `engine` global variable.

### Script Arguments
Each script can have a number of arguments, which can be accessible through the editor. In order to have this functionality, you must add static `arg_names` and `arg_types` arrays, which are `string` and `engine.Types` arrays respectively. The `arg_names` array contains the names of the arguments, and the `arg_types` array contains the types of the arguments. The order of the arguments in each array must match.

### Entity Scripts
Entity scripts are scripts which are attached to entities. When creating a new entity, you must select the script that you want to use for that entity. Entity scripts must extend from the `GameObjectBase` class.


## Prefabs