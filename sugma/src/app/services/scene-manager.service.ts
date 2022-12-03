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

  saveScene(fileName: string) {
    // save the current scene to json
    const json = JSON.stringify(this.currentScene);
    const nw = window.nw;
    const fs = nw.require('fs');
    fs.writeFile(fileName + '.json', json, 'utf8', function(err: { message: string; }) {
      if (err) {
        alert("An error occured creating the file "+ err.message)
      }
    });
  }

}
