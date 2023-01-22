import { Injectable } from '@angular/core';

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

  add(name: string, scene: Scene) {
    this.scenes.set(name, scene);
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

}
