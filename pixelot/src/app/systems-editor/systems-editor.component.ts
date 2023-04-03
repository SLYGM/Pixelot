import { Component } from '@angular/core';
import { ImportWatcherService } from 'app/services/import-watcher.service';
import { SceneDataService } from 'app/services/scene-data.service';
import * as engine from 'retro-engine';

type SystemArg = {name: string, type: string, value: any};

@Component({
  selector: 'app-systems-editor',
  templateUrl: './systems-editor.component.html',
  styleUrls: ['./systems-editor.component.scss']
})
export class SystemsEditorComponent {
  arg_map: Map<string, SystemArg[]> = new Map();
  system_names: string[] = [];

  constructor(public importService: ImportWatcherService, public sceneService: SceneDataService) {
    this.update();
    this.importService.getSystemUpdate().subscribe(() => {
      this.update();
    });
  }

  update() {
    this.system_names = this.getSystems();
    this.arg_map.clear();
    for (const system of this.system_names) {
      this.arg_map.set(system, this.getSystemArgs(system));
    }
  }

  getSystems() {
    return engine.ImportManager.getAllSystems().sort();
  }

  getSystemArgs(system_name: string) {
    const system = engine.ImportManager.getSystem(system_name);
    let args = [];
    let arg_values = this.sceneService.getSystemArgs(engine.SceneManager.currentScene.name, system_name);

    // if there are missing arguments, generate defaults
    if (arg_values.length !== system.arg_names.length) {
      arg_values = this.generateDefaultArgs(system);
    }
    for (let i = 0; i < system.arg_names.length; i++) {
      args.push({name: system.arg_names[i], type: system.arg_types[i].constructor.name, value: arg_values[i]});
    }
    return args;
  }

  private generateDefaultArg(type: string) {
    switch (type) {
      case 'StringType':
        return '';
      case 'NumberType':
        return 0;
      case 'BooleanType':
        return false;
      case 'FileType':
        return '';
      default:
        return '';
    }
  }

  private generateDefaultArgs(system) {
    const args = [];
    for (let i = 0; i < system.arg_names.length; i++) {
      args.push(this.generateDefaultArg(system.arg_types[i].constructor.name));
    }
    return args;
  }

  handleArgChange(system_name: string, index: number, event: any) {
    this.sceneService.updateSystemArg(engine.SceneManager.currentScene.name, system_name, index, event.target.value);
    this.sceneService.saveScene(engine.SceneManager.currentScene.name);
    // if the system exists, then remove it and add it again
    if (engine.SceneManager.currentScene.hasSystem(system_name)) {
      // find the system by name
      const sys = engine.SceneManager.currentScene.getSystems().filter(s => s.name === system_name)[0].system;
      engine.SceneManager.currentScene.removeSystem(sys);
      // re-create the system with the new args
      const sys_import = engine.ImportManager.getSystem(system_name);
      const sys_args = this.sceneService.getSystemArgs(engine.SceneManager.currentScene.name, system_name);
      const parsed_args = sys_import.parseArgs(sys_args);
      const new_sys = new sys_import.constr(...parsed_args);
      engine.SceneManager.currentScene.addSystem(new_sys, 1);
    }
  }
}
