import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SceneDataService } from 'app/services/scene-data.service';
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

  constructor(private sceneData: SceneDataService, private _snackBar: MatSnackBar) {
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
        }
      }
    }
  }
    
  selectEntity(entity: string) {
    this.entitySelected.emit(entity);
  }
}
