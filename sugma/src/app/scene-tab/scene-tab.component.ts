import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SceneManagerService } from 'app/scene-manager.service';
import { Entity, Scene } from 'types';

@Component({
  selector: 'scene-tab',
  templateUrl: './scene-tab.component.html',
  styleUrls: ['./scene-tab.component.scss']
})
export class SceneTabComponent {
  sceneName?: string;
  scenes?: Map<string, Scene>;
  scene?: Scene;
  selectedEntity?: Entity;

  constructor(private route: ActivatedRoute, private sceneManager: SceneManagerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sceneName = params['sceneName'];
    });
    if (this.sceneName) {
      this.scene = this.sceneManager.getScene(this.sceneName);
    }
    if (this.scene && this.scene.entities.length > 0) {
      this.selectedEntity = this.scene.entities[0];
    }
  }
}
