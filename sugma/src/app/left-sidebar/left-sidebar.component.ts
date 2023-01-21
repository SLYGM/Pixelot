import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  constructor() {
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
      for (const [entityName, entity] of this.scene.getEntities()) {
        const sprite = entity.getFromName('Sprite');
        if (sprite) {
          //TODO: get actual layer
          this.layerEntities[this.layerNames.indexOf('foreground')].push(entityName);
        }
      }
    }
  }
    
  selectEntity(entity: string) {
    this.entitySelected.emit(entity);
  }
}
