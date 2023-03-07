import { Component, ElementRef, EventEmitter, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as engine from 'retro-engine';
import { GameObjectBase } from 'retro-engine';
import { SceneDataService } from 'app/services/scene-data.service';
import { SceneTabComponent } from 'app/scene-tab/scene-tab.component';
import { FileService } from 'app/services/file.service';

const nw = (window as any).nw;
const fs = nw.require('fs');
const path = nw.require('path');

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent {
  @Input() entityName?: string;
  @Output() renameEntity = new EventEmitter<{'oldName': string, 'newName': string}>();
  entity?: GameObjectBase;
  importManager = engine.ImportManager;
  currentSceneName?: string;
  entityArgNames: string[];
  stringType = engine.Types.String;
  numberType = engine.Types.Number;
  booleanType = engine.Types.Boolean;
  isResizing = false;
  assetOptions = [];
  assets = [];
  selectedAsset:string;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, public sceneData: SceneDataService, public fileService: FileService, @Optional() public parentComponent?: SceneTabComponent) {
    this.parentComponent = parentComponent;
    this.assets = [...engine.Renderer.textures.keys()];    
    this.update();
  }

  ngOnInit() {
    //TODO change to make use of project assets folder
    fs.readdir("../engine/images", (err: any, files: any[]) => {
      if (err) {
        console.log(err); 
      } else {
        files.forEach(file => {
          this.assetOptions.push(file);
        });
      }
    });
  }

  ngOnChanges() {
    this.update();
    if(this.entity){
      this.selectedAsset = this.sceneData.getComponentArgs(this.currentSceneName,this.entity.name,'Sprite')[0];
    }
    console.log(this.selectedAsset);
  }

  update() {
    if (this.entityName) {
      this.entity = engine.SceneManager.currentScene.getEntity(this.entityName);
    } else {
      this.entity = undefined;
    }
    if (engine.SceneManager.currentScene) {
      this.currentSceneName = engine.SceneManager.currentScene.name;
    }
    if (this.entityName && this.currentSceneName) {
      this.entityArgNames = engine.ImportManager.getEntity(this.sceneData.getEntityClass(this.currentSceneName, this.entityName)).arg_names
    }
  }

  updateLeftSidebar() {
    if (this.parentComponent && this.parentComponent.leftSidebar) {
      this.parentComponent.leftSidebar.update();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponentDialog, {
      width: '500px',
      data: this.entity,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.entity && result) {
        if (this.entity.getAllComponents().find(c => c === result)) {
          this._snackBar.open('Component already exists', 'Close', {
            duration: 2000,
          });
        } else {
          const component_constr = engine.ImportManager.getComponent(result);
          let default_args = [];
          for (const t of component_constr.arg_types) {
            if (t === engine.Types.String) {
              default_args.push('');
            } else if (t === engine.Types.Number) {
              default_args.push(0);
            } else if (t === engine.Types.Boolean) {
              default_args.push(false);
            }
          }
          // Add to scene JSON
          this.sceneData.addComponent(this.currentSceneName, this.entityName, result, default_args);
          // Add to entity
          const comp_args = component_constr.parseArgs(default_args);
          const new_component = new component_constr.constr(...comp_args);
          this.entity.add(new_component);
          // Save changes to file
          this.sceneData.saveScene(this.currentSceneName);
        }
      }
    });
  }

  removeComponent(component: string) {
    this.sceneData.removeComponent(this.currentSceneName, this.entityName, component);
    //TODO: give error if another component depends on this one
    this.entity.removeByName(component);
    // Save changes to file
    this.sceneData.saveScene(this.currentSceneName);
  }

  handleEntityNameChange(event: any) {
    this.sceneData.updateEntityName(this.currentSceneName, this.entityName, event.target.value);
    this.renameEntity.emit({'oldName': this.entityName, 'newName': event.target.value});
    // Save changes to file
    this.sceneData.saveScene(this.currentSceneName);
  }

  handleEntityChange(event: any, index: number) {
    if (event.target) {
      // textbox event
      this.sceneData.updateEntityArg(this.currentSceneName, this.entityName, index, event.target.value);
    } else {
      // checkbox event
      this.sceneData.updateEntityArg(this.currentSceneName, this.entityName, index, event.checked.toString());
    }
    const args = this.sceneData.getEntityArgs(this.currentSceneName, this.entityName);
    const entityClass = this.sceneData.getEntityClass(this.currentSceneName, this.entityName);
    this.entity.onCreate(...engine.ImportManager.getEntity(entityClass).parseArgs(args));
    // Save changes to file
    this.sceneData.saveScene(this.currentSceneName);
    this.updateLeftSidebar();
  }

  handleComponentChange(event: any, component: string, index: number) {
    if (event.target) {
      // textbox event
      this.sceneData.updateComponentArg(this.currentSceneName, this.entityName, component, index, event.target.value);
    } else if(event.checked) {
      // checkbox event
      this.sceneData.updateComponentArg(this.currentSceneName, this.entityName, component, index, event.checked.toString());
    } else{
      // dropdown event
      this.sceneData.updateComponentArg(this.currentSceneName, this.entityName, component, index, event.value);
    }
    // remove and re-add component to update it
    this.entity.removeByName(component);

    const component_constr = engine.ImportManager.getComponent(component);
    const comp_args = component_constr.parseArgs(this.sceneData.getComponentArgs(this.currentSceneName, this.entityName, component));
    const updated_component = new component_constr.constr(...comp_args);
    this.entity.add(updated_component);
    updated_component._create();

    // Save changes to file
    this.sceneData.saveScene(this.currentSceneName);
    this.updateLeftSidebar();
  }

  saveAsPrefab() {
    // get the selected entity
    const ent = this.sceneData.scenes.get(this.currentSceneName)
                .entities.find(e => e.name === this.entityName);
    const ent_path = path.join(engine.SceneManager.project_dir, ent.name + '.prefab')
    fs.writeFileSync(ent_path, JSON.stringify(ent));
    // load the newly created prefab
    engine.PrefabFactory.loadPrefab(ent_path);
  }

  onResizeBarMouseDown(event: MouseEvent) {
    this.isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const startX = event.clientX;
    const startWidth = this.hostRef.nativeElement.clientWidth;

    const onMouseMove = (event: MouseEvent) => {
      const newWidth = startWidth + (startX - event.clientX);
      this.hostRef.nativeElement.style.width = newWidth + 'px';
    }

    const onMouseUp = (event: MouseEvent) => {
      this.isResizing = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  
  addNewAsset() {
    const dialogRef = this.dialog.open(AddAssetDialog, {
      width: '500px',
      data: this.assetOptions,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        // Add texture to engine
        const path = './assets/images/' + result + '.png';
        engine.Renderer.loadTexture(path, result);
        this.assets = [...engine.Renderer.textures.keys()];

        // Add texture to project.json
        const projectPath = this.fileService.path;
        const projectFiles = engine.ImportManager.getFilePaths(projectPath);
        const projJSONPath = projectPath + projectFiles.project + ".proj";
        const projectJson = JSON.parse(fs.readFileSync(projJSONPath, "utf8"));
        projectJson.textures.push({name: result, path: './assets/images/' + result + '.png'});
        const jsonData = JSON.stringify(projectJson);
        fs.writeFile(projJSONPath, jsonData, (err) => {
          if (err) throw err;
          console.log('Data written to file');
        });
      }
    });
  }
}

@Component({
  selector: 'add-asset-dialog',
  templateUrl: 'add-asset-dialog.html',
})
export class AddAssetDialog {
  formControl = new FormControl('');
  filteredOptions = [];
  engineAssets = [...engine.Renderer.textures.keys()];   

  constructor(
    public dialogRef: MatDialogRef<AddAssetDialog>,
    @Inject(MAT_DIALOG_DATA) public options:string[],
  ) {
    this.filteredOptions = options;
    this.filteredOptions = this.filteredOptions.map((option) => option.replace(/\.[^/.]+$/, ''));
    this.filteredOptions = this.filteredOptions.filter(item => !this.engineAssets.includes(item));  
  }

  onCancelClick(): void {}

  onAddClick(): void {
    const asset = this.formControl.value;
    this.dialogRef.close(asset);
  }
}

@Component({
  selector: 'add-component-dialog',
  templateUrl: 'add-component-dialog.html',
})
export class AddComponentDialog {
  formControl = new FormControl('');
  options: string[] = engine.ImportManager.getAllComponents();
  filteredOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<AddComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public entity: GameObjectBase,
  ) {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    const componentName = this.formControl.value;
    this.dialogRef.close(componentName);
  }
}
