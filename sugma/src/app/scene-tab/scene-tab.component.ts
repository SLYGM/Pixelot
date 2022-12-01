import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SceneManagerService } from 'app/services/scene-manager.service';
import { Entity, Scene } from 'types';
import { filter } from 'rxjs/operators';

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
  private sub;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private sceneManager: SceneManagerService) 
  {
    this.sub = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.route.params.subscribe(params => {
        this.sceneName = params['sceneName'];
      });
      if (this.sceneName) {
        this.scene = this.sceneManager.getScene(this.sceneName);
      } 
      if (!this.scene) {
        // The scene doesn't exist, so redirect home
        console.log("Scene doesn't exist, redirecting home");
        this.router.navigate(['/']);
        return;
      } else if (this.scene.entities.length > 0) {
        this.selectedEntity = this.scene.entities[0];
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
}
}
