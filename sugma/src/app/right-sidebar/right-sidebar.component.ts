import { Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as engine from 'retro-engine';
import { GameObjectBase } from 'retro-engine';
import { SceneDataService } from 'app/services/scene-data.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent {
  @Input() entityName?: string;
  entity?: GameObjectBase;
  importManager = engine.ImportManager;
  currentSceneName?: string;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, public sceneData: SceneDataService) {
    if (this.entityName) {
      this.entity = engine.SceneManager.currentScene.getEntity(this.entityName);
    }
    if (engine.SceneManager.currentScene) {
      this.currentSceneName = engine.SceneManager.currentScene.name;
    }
  }

  ngOnChanges() {
    if (this.entityName) {
      this.entity = engine.SceneManager.currentScene.getEntity(this.entityName);
    }
    if (engine.SceneManager.currentScene) {
      this.currentSceneName = engine.SceneManager.currentScene.name;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponentDialog, {
      width: '500px',
      data: this.entity,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (this.entity && result) {
        if (this.entity.getAllComponents().find(c => c === result)) {
          this._snackBar.open('Component already exists', 'Close', {
            duration: 2000,
          });
        } else {
          // TODO: Get component data and add it to the entity
        }
      }
    });
  }

  handleEntityChange(event: any, index: number) {
    //TODO: save changes to file
    this.sceneData.updateEntityArg(this.currentSceneName, this.entityName, index, event.target.value);
    const args = this.sceneData.getEntityArgs(this.currentSceneName, this.entityName);
    const entityClass = this.sceneData.getEntityClass(this.currentSceneName, this.entityName);
    this.entity.onCreate(...engine.ImportManager.getEntity(entityClass).parseArgs(args));
  }

  handleComponentChange(event: any, component: string, index: number) {
    console.log(event, component, index);
    const gameComponent = this.entity.getByName(component);
    //TODO: save changes to file
    // this.sceneManager.saveScene(this.sceneManager.currentSceneName);
    this.sceneData.updateComponentArg(this.currentSceneName, this.entityName, component, index, event.target.value);
    // remove and re-add component to update it
    this.entity.removeByName(component);

    const component_constr = engine.ImportManager.getComponent(component);
    const comp_args = component_constr.parseArgs(this.sceneData.getComponentArgs(this.currentSceneName, this.entityName, component));
    const updated_component = new component_constr.constr(...comp_args);
    this.entity.add(updated_component);
    console.log(engine.SceneManager.currentScene);
  }
}

@Component({
  selector: 'add-component-dialog',
  templateUrl: 'add-component-dialog.html',
})
export class AddComponentDialog {
  formControl = new FormControl('');
  // TODO: Get available components
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
