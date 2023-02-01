import { Injectable } from '@angular/core';

const nw = (window as any).nw;
const fs = nw.require("fs");

export type EntityComponent = {
  component_name: string;
  args: string[];
};

export type Entity = {
  name: string;
  class: string;
  args: string[]
  components: EntityComponent[];
};

export class Scene {
  name: string;
  entities: Entity[];

  constructor(name: string) {
    this.name = name;
    this.entities = [];
  }
};

@Injectable({
  providedIn: 'root'
})
export class SceneDataService {
  scenes: Map<string, Scene> = new Map();
  scene_paths: Map<string, string> = new Map();

  saveScene(sceneName: string) {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const sceneJson = JSON.stringify(scene, null, 2);
      const scenePath = this.scene_paths.get(sceneName);
      fs.writeFile(scenePath, sceneJson, (err: any) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }

  add(name: string, scene: Scene, path: string) {
    this.scenes.set(name, scene);
    this.scene_paths.set(name, path);
  }

  addEntity(sceneName: string, entityClass: string, entityName: string, args: string[]) {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      scene.entities.push({
        name: entityName,
        class: entityClass,
        args: args,
        components: []
      });
    }
  }

  getEntityClass(sceneName: string, entityName: string): string {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const entity = scene.entities.find(e => e.name === entityName);
      if (entity) {
        return entity.class;
      }
    }
    return '';
  }

  getEntityArgs(sceneName: string, entityName: string): string[] {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const entity = scene.entities.find(e => e.name === entityName);
      if (entity) {
        return entity.args;
      }
    }
    return [];
  }

  getComponentArgs(sceneName: string, entityName: string, componentName: string): string[] {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const entity = scene.entities.find(e => e.name === entityName);
      if (entity) {
        const component = entity.components.find(c => c.component_name === componentName);
        if (component) {
          return component.args;
        }
      }
    }
    return [];
  }

  getEntityLayer(sceneName: string, entityName: string): string {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const entity = scene.entities.find(e => e.name === entityName);
      if (entity) {
        const sprite = entity.components.find(c => c.component_name === 'Sprite');
        if (sprite) {
          return sprite.args[1];
        }
      }
    }
    return '';
  }

  updateEntityName(sceneName: string, entityName: string, newName: string) {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const entity = scene.entities.find(e => e.name === entityName);
      if (entity) {
        entity.name = newName;
      }
    }
  }

  updateEntityArg(sceneName: string, entityName: string, index: number, value: string) {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const entity = scene.entities.find(e => e.name === entityName);
      if (entity) {
        entity.args[index] = value;
      }
    }
  }

  updateComponentArg(sceneName: string, entityName: string, componentName: string, index: number, value: string) {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const entity = scene.entities.find(e => e.name === entityName);
      if (entity) {
        const component = entity.components.find(c => c.component_name === componentName);
        if (component) {
          component.args[index] = value;
        }
      }
    }
  }

  addComponent(sceneName: string, entityName: string, componentName: string, args: string[]) {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const entity = scene.entities.find(e => e.name === entityName);
      if (entity) {
        entity.components.push({
          component_name: componentName,
          args: args
        });
      }
    }
  }

  removeComponent(sceneName: string, entityName: string, componentName: string) {
    const scene = this.scenes.get(sceneName);
    if (scene) {
      const entity = scene.entities.find(e => e.name === entityName);
      if (entity) {
        entity.components = entity.components.filter(c => c.component_name !== componentName);
      }
    }
  }

}
