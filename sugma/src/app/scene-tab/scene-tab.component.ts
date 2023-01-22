import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import * as engine from 'retro-engine';
import { Subscription } from 'rxjs';
import { GameObjectBase, Scene } from 'retro-engine';
import { LeftSidebarComponent } from 'app/left-sidebar/left-sidebar.component';

@Component({
  selector: 'scene-tab',
  templateUrl: './scene-tab.component.html',
  styleUrls: ['./scene-tab.component.scss']
})
export class SceneTabComponent {
  @ViewChild(LeftSidebarComponent) leftSidebar: LeftSidebarComponent;
  sceneName?: string;
  scene?: Scene;
  selectedEntity?: string;
  layerNames: string[];
  private sub: Subscription;

  constructor(private router: Router, 
              private route: ActivatedRoute) 
  {
    this.sub = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(async () => {
      
      // connect the canvas to the engine
      engine.connectCanvas();
      this.layerNames = Array.from(engine.Renderer.layerAliases.keys());

      this.route.params.subscribe(params => {
        this.sceneName = params['sceneName'];
      });

      if (engine.SceneManager.getSceneNames().includes(this.sceneName)) {
        console.log("Loading scene " + this.sceneName);
        engine.SceneManager.switchToScene(this.sceneName, false);
        this.scene = engine.SceneManager.currentScene;
      } else {
        // The scene doesn't exist, so redirect home
        console.log("Scene doesn't exist, redirecting home");
        this.router.navigate(['/']);
        return;
      }
    });
  }

  handleEntitySelected(entity: string) {
    this.selectedEntity = entity;
  }

  handleEntityRenamed(event: {'oldName': string, 'newName': string}) {
    this.scene?.renameEntity(event.oldName, event.newName);
    this.selectedEntity = event.newName;
    this.leftSidebar.update();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    engine.disconnectCanvas();
  }
}
