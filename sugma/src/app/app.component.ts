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
    // initialise the engine renderer
    (async function() {
      engine.Renderer.init(true);
    })();
    
  }
}
