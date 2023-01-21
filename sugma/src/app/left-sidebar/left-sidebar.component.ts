import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity, Scene } from 'types';
import * as engine from 'retro-engine';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent {
  @Input() scene?: Scene;
  @Input() layerNames: string[];
  @Output() entitySelected = new EventEmitter<Entity>();
  layerEntities: Entity[][];

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
      for (const entity of this.scene.entities) {
        for (const component of entity.components) {
          if (component.component_name === 'Sprite') {
            this.layerEntities[this.layerNames.indexOf(component.args[1])].push(entity);
          }
        }
      }
    }
    console.log(this.layerEntities);
  }
    
  selectEntity(entity: Entity) {
    this.entitySelected.emit(entity);
  }
}
