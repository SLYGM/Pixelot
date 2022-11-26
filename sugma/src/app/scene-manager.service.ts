import { Injectable } from '@angular/core';
import { Scene } from 'types';

@Injectable({
  providedIn: 'root'
})
export class SceneManagerService {
  scenes: Map<string, Scene> = new Map();

  getScene(name: string): Scene | undefined {
    console.log('Getting scene ' + name);
    return this.scenes.get(name);
  }

  addScene(scene: Scene) {
    console.log('Adding scene ' + scene.name);
    this.scenes.set(scene.name, scene);
  }

  getScenes(): string[] {
    return Array.from(this.scenes.keys());
  }
}
