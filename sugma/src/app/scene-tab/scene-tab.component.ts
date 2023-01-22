import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import * as engine from 'retro-engine';
import { Subscription } from 'rxjs';
import { GameObjectBase, Scene } from 'retro-engine';

@Component({
  selector: 'scene-tab',
  templateUrl: './scene-tab.component.html',
  styleUrls: ['./scene-tab.component.scss']
})
export class SceneTabComponent {
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

      // loading the engine here because it needs to be loaded after the canvas is created
      engine.Renderer.init();
      engine.Renderer.setResolution(426, 240);

      await engine.doImports();

      engine.Game.loadGame("../engine/");
      this.layerNames = Array.from(engine.Renderer.layerAliases.keys());
      engine.Game.start(true);

      this.route.params.subscribe(params => {
        this.sceneName = params['sceneName'];
      });

      if (this.sceneName) {
        engine.SceneManager.switchToScene(this.sceneName, false);
        this.scene = engine.SceneManager.currentScene;
      } 
      if (!this.scene) {
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

  ngOnDestroy() {
    this.sub.unsubscribe();
}
}
