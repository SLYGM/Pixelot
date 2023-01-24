import { Component } from '@angular/core';
import { SceneTabComponent } from './scene-tab/scene-tab.component';

import * as engine from 'retro-engine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sugma';
  
  constructor() {
    // initialise the engine
    (async function() {
      engine.Renderer.init(true);
  
      //await engine.doImports();
    
      // NOTE: this line loads the project.json
      //engine.Game.loadGame("../sugma/projects/project1/");
      //engine.Game.start(true);
    })();
    
  }
}
