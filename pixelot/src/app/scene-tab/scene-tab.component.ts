import { Component, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import * as engine from 'retro-engine';
import { Subscription } from 'rxjs';
import { Scene } from 'retro-engine';
import { LeftSidebarComponent } from 'app/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from 'app/right-sidebar/right-sidebar.component';

@Component({
  selector: 'scene-tab',
  templateUrl: './scene-tab.component.html',
  styleUrls: ['./scene-tab.component.scss']
})
export class SceneTabComponent {
  @ViewChild(LeftSidebarComponent) leftSidebar: LeftSidebarComponent;
  @ViewChild(RightSidebarComponent) rightSidebar: RightSidebarComponent;

  // add mouse listeners to the document so that we can pan the viewport
  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e: MouseEvent) {
    if (this.mouseDown) {
      if (this.mouseDown) {
        let dx = e.clientX - this.prevMousePos[0];
        let dy = e.clientY - this.prevMousePos[1];
        this.prevMousePos = [e.clientX, e.clientY];
        engine.Renderer.viewport.x -= dx;
        engine.Renderer.viewport.y -= dy;
      }
    }
  }

  sceneName?: string;
  scene?: Scene;
  selectedEntity?: string;
  layerNames: string[];
  private sub: Subscription;
  private mouseDown: boolean = false;
  private prevMousePos: number[];


  constructor(private router: Router, 
              private route: ActivatedRoute) 
  {
    this.sub = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(async () => {
      
      // connect the canvas to the engine
      engine.connectCanvas();
      
      this.route.params.subscribe(params => {
        this.sceneName = params['sceneName'];
      });

      if (engine.SceneManager.getSceneNames().includes(this.sceneName)) {
        console.log("Loading scene " + this.sceneName);
        engine.SceneManager.switchToScene(this.sceneName, false);
        this.scene = engine.SceneManager.currentScene;
        this.layerNames = Array.from(engine.Renderer.layerAliases.get(this.scene).keys());
      } else {
        // The scene doesn't exist, so redirect home
        console.log("Scene doesn't exist, redirecting home");
        this.router.navigate(['/']);
        return;
      }
    });
  }

  handleEntitySelected(entity: string | null) {
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
  
  handleMouseDown(event: MouseEvent) {
    this.prevMousePos = [event.clientX, event.clientY];
    this.mouseDown = true;
  }
  
  handleMouseUp(event: MouseEvent) {
    this.mouseDown = false;
  }

  playScene() {
    engine.Game.render_only = false;
  }

  stopScene() {
    engine.Game.render_only = true;
    // reload the current scene
    engine.SceneManager.switchToScene(this.sceneName);
    this.scene = engine.SceneManager.currentScene;
    // since the selected entity is recreated, we need to refresh the sidebar
    this.rightSidebar.update();
  }
}
