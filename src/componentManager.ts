import {Component} from "./ecs.js";
import { StringUtils } from "./utils/baseutils.js";

export class ComponentManager {
  private static components = new Map<string, Component>();
  private static componentsFolder = './build/components/';

  static getComponent(component:string) : Component {
    if (this.components.has(component))
      return this.components.get(component);
    console.trace("Cannot find component '" + component + "'.");
    return null;
  }

  static hasComponent(component:string) : boolean {
    return this.components.has(component);
  }

  static async loadComponents() {
      const fs = require('fs');
      let files = (fs.readdirSync(this.componentsFolder) as string[]);
      let componentsList : string[] = [];
      files.forEach(file => {
          let fileName = file.split(".")[0];
           if (StringUtils.isPostfix(file, ".js")) {
            componentsList.push(fileName);
          }
      });
      for (let component of componentsList) {
        await this.importComponent(component);
      }
  }

  private static async importComponent(component:string) {
      let a = await import('./components/'+component+".js");
      this.components.set(a.default.name, a.default);
  }
}

await ComponentManager.loadComponents();