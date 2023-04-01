import { Component } from '@angular/core';
import { ImportWatcherService } from 'app/services/import-watcher.service';
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

  constructor(public importService: ImportWatcherService) {
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
    console.log(this.arg_map);
    console.log(this.system_names);
  }

  getSystems() {
    return engine.ImportManager.getAllSystems().sort();
  }

  getSystemArgs(system_name: string) {
    const system = engine.ImportManager.getSystem(system_name);
    let args = [];
    for (let i = 0; i < system.arg_names.length; i++) {
      args.push({name: system.arg_names[i], type: system.arg_types[i].constructor.name, value: null});
    }
    return args;
  }

  changeArg(system_name: string, index: number, value: any) {

  }

  handleArgChange(system_name: string, index: number, event: any) {

  }
}
