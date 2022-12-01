import { Injectable } from '@angular/core';
import { Scene, Entity} from 'types'

@Injectable({
  providedIn: 'root'
})
export class SceneManagerService {
  scenes: Map<string, Scene> = new Map();
  currentScene: Scene | undefined;
  currentSceneName: string | undefined;

  getScene(name: string): Scene | undefined {
    console.log('Getting scene ' + name);
    return this.scenes.get(name);
  }

  addScene(scene: Scene) {
    console.log('Adding scene ' + scene.name);
    this.scenes.set(scene.name, scene);
  }

  deleteScene(name: string) {
    if (this.currentSceneName == name) {
      this.currentScene = undefined;
      this.currentSceneName = undefined;
    }
    this.scenes.delete(name);
  }

  getScenes(): string[] {
    return Array.from(this.scenes.keys());
  }

  setCurrentScene(name: string) {
    this.currentSceneName = name;
    this.currentScene = this.scenes.get(name);
  }

  // addEntity(entity: Entity) {
  //   this.currentScene?.addEntity(entity);
  // }

  // saveScene(fileName: string){
  //   // create a JSON object
  //   const proxies = this.currentScene?.getEntities();
  //   const entities = [];
  //   if(proxies){
  //     for (const proxy of proxies) {
  //         const components = [];
  //         for (const component of [...proxy.getAllComponents()]) {
  //             const component_constr = ImportManager.getComponent(component);
  //             components.push({
  //                 component_name: component,
  //                 value: proxy.get(component_constr),
  //             });
  //         }
  //         entities.push({ name: proxy.name, components: components });
  //     }
  //   }

  //   const sceneSaveFile = {
  //       name: this.currentSceneName,
  //       entities: entities,
  //   };

  //   // convert JSON object to a string
  //   const data = JSON.stringify(sceneSaveFile);

  //   const fs = require("fs");
  //   fs.writeFile(fileName + ".json", data, function (err: any) {
  //       if (err) {
  //           console.log(err);
  //       }
  //       console.log("saving json");
  //   });
  // }

}