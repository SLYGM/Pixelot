import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SceneDataService } from 'app/services/scene-data.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as engine from 'retro-engine';
import { GameObjectBase, Scene } from 'retro-engine';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent {
  @Input() scene?: Scene;
  @Input() layerNames: string[];
  @Output() entitySelected = new EventEmitter<string>();
  layerEntities?: string[][];
  otherEntities: string[] = [];

  constructor(public dialog: MatDialog, private sceneData: SceneDataService, private _snackBar: MatSnackBar) {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    if (this.scene) {
      this.layerEntities = [];
      for (let i = 0; i < this.layerNames.length; i++) {
        this.layerEntities.push([]);
      }
      for (const [_, entity] of this.scene.getEntities()) {
        const layer = this.sceneData.getEntityLayer(this.scene.name, entity.name);
        if (this.layerNames.indexOf(layer) !== -1) {
          this.layerEntities[this.layerNames.indexOf(layer)].push(entity.name);
        } else if (layer !== '') {
          this._snackBar.open(`Entity ${entity.name} has invalid layer ${layer}`, 'Close', {
            duration: 5000
          });
        } else {
          // Entity has no layer
          this.otherEntities.push(entity.name);
        }
      }
    }
  }
    
  selectEntity(entity: string) {
    this.entitySelected.emit(entity);
  }

  openEntityDialog(): void {
    const dialogRef = this.dialog.open(AddEntityDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      const entityClass = result['gameObjectName'];
      const entityName = result['entityName'];
      if (entityClass && entityName) {
        const gameObject = engine.ImportManager.getEntity(entityClass);
        if (gameObject) {
          let entity = new gameObject.constr(entityName);
          let default_args = [];
          for (const t of gameObject.arg_types) {
            if (t === engine.Types.String) {
              default_args.push('');
            } else if (t === engine.Types.Number) {
              default_args.push(0);
            } else if (t === engine.Types.Boolean) {
              default_args.push(false);
            }
          }
          this.scene?.addEntity(entity, default_args);
          this.sceneData.addEntity(this.scene.name, entityClass, entityName, default_args);
          this.update();
        }
      }
    });

  }
}

@Component({
  selector: 'add-entity-dialog',
  templateUrl: 'add-entity-dialog.html',
})
export class AddEntityDialog {
  nameForm = new FormControl('');
  gameObjectForm = new FormControl('');
  options: string[] = engine.ImportManager.getAllEntities();
  filteredOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<AddEntityDialog>,
  ) {
    this.filteredOptions = this.gameObjectForm.valueChanges.pipe(
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
    const gameObjectName = this.gameObjectForm.value;
    const entityName = this.nameForm.value;
    this.dialogRef.close({gameObjectName, entityName});
  }
}
