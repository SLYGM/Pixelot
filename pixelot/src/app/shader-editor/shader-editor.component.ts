import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ProjDataService } from 'app/services/proj-data.service';
import { ImportWatcherService } from 'app/services/import-watcher.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as engine from 'retro-engine';

type ShaderArg = {name: string, type: string, value: any};

@Component({
  selector: 'app-shader-editor',
  templateUrl: './shader-editor.component.html',
  styleUrls: ['./shader-editor.component.scss']
})
export class ShaderEditorComponent {
  shader_names: string[] = [];
  shader_args: ShaderArg[][] = [];
  show_states: boolean[] = [];

  
  constructor(private dialog: MatDialog, private projService: ProjDataService, private importWatcher: ImportWatcherService) {
    this.shader_names = this.getShaders();
    for (let i = 0; i < this.shader_names.length; i++) {
      this.shader_args.push(this.getShaderArgs(i));
      this.show_states.push(true);
    }

    // watch for shader imports
    this.importWatcher.getShaderUpdate().subscribe(() => {
      this.handleShaderImport();
    });
  }

  hideShader(index: number, event: any) {
    event.stopPropagation();
    this.show_states[index] = false;
    engine.PostProcessing.post_queue[index].disabled = true;
  }

  showShader(index: number, event: any) {
    event.stopPropagation();
    this.show_states[index] = true;
    engine.PostProcessing.post_queue[index].disabled = false;
  }

  handleShaderImport() {
    // delete any shaders for which the class no longer exists
    for (let i = 0; i < this.shader_names.length; i++) {
      if (!engine.ImportManager.getShader(this.shader_names[i])) {
        this.removeShader(i);
        i--;
      }
    }
  }

  getShaders() {
    return this.projService.getShaders();
  }

  getShaderArgs(shader_index: number) {
    const name = this.shader_names[shader_index];
    const shader = engine.ImportManager.getShader(name);
    let args = [];

    for (let i = 0; i < shader.arg_names.length; i++) {
      args.push({name: shader.arg_names[i], type: shader.arg_types[i].constructor.name, value: this.projService.getShaderArg(shader_index, i)});
    }
    return args;
  }

  handleArgChange(shader_index: number, arg_index: number, event: any) {
    this.projService.setShaderArg(shader_index, arg_index, event.target.value);
    this.projService.saveProject();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.shader_names, event.previousIndex, event.currentIndex);
    this.projService.moveShader(event.previousIndex, event.currentIndex);
    this.projService.saveProject();
    this.shader_names = this.getShaders();
  }

  removeShader(index: number) {
    this.projService.deleteShader(index);
    this.projService.saveProject();
    this.shader_names.splice(index, 1);
  }

  openShaderDialogue() {
    const dialogRef = this.dialog.open(AddShaderDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const shader = {name: result, args: []}
        this.projService.addShader(shader);
        this.projService.saveProject();
        this.shader_names = this.getShaders();
        this.shader_args.push(this.getShaderArgs(this.shader_names.length - 1));
      }
    });
  }
}



@Component({
  selector: 'add-shader-dialog',
  templateUrl: './add-shader-dialog.html',
})
export class AddShaderDialog {
  selected_shader: string = null;

  constructor(public dialogRef: MatDialogRef<AddShaderDialog>) {}
  onAddClick() {
    this.dialogRef.close(this.selected_shader);
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  getShaders() {
    return engine.ImportManager.getAllShaders();
  }
}