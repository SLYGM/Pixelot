import { Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as engine from 'retro-engine';
import { GameObjectBase } from 'retro-engine';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent {
  @Input() entityName?: string;
  entity?: GameObjectBase;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {
    if (this.entityName) {
      this.entity = engine.SceneManager.currentScene.getEntity(this.entityName);
    }
  }

  ngOnChanges() {
    if (this.entityName) {
      this.entity = engine.SceneManager.currentScene.getEntity(this.entityName);
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

  handleChange(event: any, component: string, property: any) {
    const gameComponent = this.entity.getFromName(component);
    //TODO: save changes to file
    // this.sceneManager.saveScene(this.sceneManager.currentSceneName);
    const index = engine.ImportManager.getComponent(component).arg_names.indexOf(property.key);
    console.log(engine.ImportManager.getComponent(component));
    const argType = engine.ImportManager.getComponent(component).arg_types[index];
    gameComponent[property.key] = argType.parse(event.target.value);
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
