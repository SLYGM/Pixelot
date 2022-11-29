import { Component, EventEmitter, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SceneManagerService } from 'app/scene-manager.service';
import { Scene } from 'types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() loadedScene = new EventEmitter<Scene>();
  activeLink = 'Visual Scripting Editor';
  background: ThemePalette = 'primary';
  accent: ThemePalette = 'accent'

  constructor(public sceneManager: SceneManagerService) { }

  handleFileSelect(e: any) {
    console.log(e);
    
    let files = e.target.files;
    let file = files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      if (e.target) {
        let scene = JSON.parse(e.target.result as string);
        this.sceneManager.addScene(scene);
        console.log(scene);
      }
    }
    reader.readAsText(file);
  }

}
