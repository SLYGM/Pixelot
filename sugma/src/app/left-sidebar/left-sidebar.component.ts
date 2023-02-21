import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SceneDataService } from 'app/services/scene-data.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as engine from 'retro-engine';
import { Scene } from 'retro-engine';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GameObjectBase } from 'retro-engine';
import { TypedConstructor } from 'retro-engine/build/typedConstructor';
import { FileUtils } from 'retro-engine';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
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
        let newLayerNames = Array.from(engine.Renderer.layerAliases.get(this.scene).keys());
        if (JSON.stringify(this.layerNames) != JSON.stringify(newLayerNames)) {
          this.layerNames = newLayerNames;
        }


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

  removeLayer(layer: string) {
    if (layer=='default')
      return;
    this.sceneData.removeLayer(this.scene.name, layer);
    engine.Renderer.removeLayer(layer, engine.SceneManager.currentScene);
    this.update();
    this.sceneData.saveScene(this.scene.name);
  }
    
  selectEntity(entity: string) {
    this.entitySelected.emit(entity);
  }

  handleEntityRightclick(event: Event) {
    event.preventDefault();
    this.trigger.openMenu();
  }

  deleteEntity(entity: string) {
    this.sceneData.removeEntity(this.scene.name, entity);
    engine.SceneManager.currentScene.deleteEntity(entity);
    this.entitySelected.emit(null);
    this.update();
    this.sceneData.saveScene(this.scene.name);
  }

  openEntityDialog(): void {
    const dialogRef = this.dialog.open(AddEntityDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // if the dialog was cancelled, return
      if (!result) {
        return;
      }

      // otherwise, get the class and name of the entity
      const entityClass = result.base as EntityClass;
      const entityName = result.entityName as string;
      
      // if both are valid, create the entity
      if (entityClass && entityName) {
        let entity: GameObjectBase;
        let gameObject: TypedConstructor<GameObjectBase>;
        let className: string;

        // result needs to be handled differently if it's a prefab or not
        if (result.base.prefab) {
          // get the base class of the prefab
          gameObject = engine.PrefabFactory.getPrefab(entityClass.name).base;
          className = engine.PrefabFactory.getPrefab(entityClass.name).base.constr.name;
          // preload the prefab
          const prefab_path = FileUtils.findFile(entityClass.name + ".prefab", engine.SceneManager.project_dir);
          if (prefab_path) {
            engine.PrefabFactory.loadPrefab(prefab_path);
          } else {
            console.error(`Prefab ${entityClass.name} not found`);
            return null;
          }
          // create the entity from the prefab
          entity = engine.PrefabFactory.create(entityClass.name, entityName);
        }
        else {
          gameObject = engine.ImportManager.getEntity(entityClass.name);
          className = entityClass.name;
          entity = new gameObject.constr(entityName);
        }
        if (gameObject && entity) {
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
          this.sceneData.addEntity(this.scene.name, className, entityName, default_args);
          this.update();
          
          // if it's a prefab, also add all the components to the scene data
          if (result.base.prefab) {
            const components = engine.PrefabFactory.getPrefab(entityClass.name).components;
            for (const component of components) {
              // the args need to be converted back to strings
              this.sceneData.addComponent(this.scene.name, entityName, 
                component.constr.constr.name, component.args.map(arg => String(arg)));
              }
            }
          }

          // finally, save the scene
          this.sceneData.saveScene(this.scene.name);
      }
    });

  }

  openLayerDialog(): void {
    const dialogRef = this.dialog.open(AddLayerDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return;

      engine.Renderer.addLayer(new engine.SpriteLayer(), result, engine.SceneManager.currentScene);
      this.sceneData.addLayer(this.scene.name, result);
      this.update();
      this.sceneData.saveScene(this.scene.name);
    });
  }
}

// represents a base class for a new entity
type EntityClass = {
  name: string,
  prefab: boolean,
}

type LayerClass = {
  name: string
}

@Component({
  selector: 'add-entity-dialog',
  templateUrl: 'add-entity-dialog.html',
})
export class AddEntityDialog {
  nameForm = new FormControl('');
  gameObjectForm = new FormControl('');
  options: EntityClass[] = [];
  filtered_base: Observable<EntityClass[]>;
  filtered_prefab: Observable<EntityClass[]>;
  selectedOption: EntityClass = null;

  constructor(
    public dialogRef: MatDialogRef<AddEntityDialog>,
  ) {
    this.options = this.getOptions();
    this.filtered_base = this.gameObjectForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.options.filter(e => !e.prefab)))
    );
    this.filtered_prefab = this.gameObjectForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.options.filter(e => e.prefab)))
    );
  }

  getOptions(): EntityClass[] {
    const options = [];
    for (const name of engine.ImportManager.getAllEntities()) {
      options.push({name, prefab: false});
    }
    for (const name of engine.PrefabFactory.getAllPrefabNames()) {
      options.push({name, prefab: true});
    }
    return options;
  }

  displayFn(entityClass: EntityClass): string {
    return entityClass && entityClass.name ? entityClass.name : '';
  }

  selectOption(e: MatAutocompleteSelectedEvent) {
    this.selectedOption = e.option.value;
  }

  private _filter(value: string | EntityClass, values: EntityClass[]): EntityClass[] {
    let filterValue: string;
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    }
    else{
      filterValue = value.name.toLowerCase();
    }
    return values.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    const base = this.selectedOption;
    const entityName = this.nameForm.value;
    this.dialogRef.close({base, entityName});
  }
}

@Component({
  selector: 'add-layer-dialog',
  templateUrl: 'add-layer-dialog.html',
})
export class AddLayerDialog {
  nameForm = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<AddLayerDialog>,
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    const name = this.nameForm.value;
    this.dialogRef.close(name);
  }
}