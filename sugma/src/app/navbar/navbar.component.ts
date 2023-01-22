import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { NewSceneDialogComponent } from 'app/new-scene-dialog/new-scene-dialog.component';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import * as engine from 'retro-engine';
import { SceneDataService } from 'app/services/scene-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  activeLink = 'Visual Scripting Editor';
  background: ThemePalette = 'primary';
  accent: ThemePalette = 'accent'
  scenes: string[] = [];

  constructor(public dialog: MatDialog, private sceneData: SceneDataService, private router: Router) {
    this.scenes = [ ...engine.SceneManager.loaded_scenes.keys() ];
  }

  handleFileSelect(e: any) {
    let files = e.target.files;
    let file = files[0];
    let path = file.path;
    let sceneName: string;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      if (e.target) {
        let scene = JSON.parse(e.target.result as string);
        console.log(scene);
        sceneName = scene['name'];
        this.sceneData.add(sceneName, scene);
      }
    };
    reader.onloadend = (_e: any) => {
      console.log(sceneName);
      engine.SceneManager.preLoadScene(sceneName, path);
      this.scenes = [ ...engine.SceneManager.loaded_scenes.keys() ];
    };
    reader.readAsText(file);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.position = { 'top': '48px' };
    dialogConfig.ariaModal = true;

    const dialogRef = this.dialog.open(NewSceneDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.createScene(result);
    });
  }

  createScene(sceneName:string){
    // create new scene in engine manager
    if (engine.SceneManager.createScene(sceneName)) {
      // if the scene has been successfully created, switch to it
      engine.SceneManager.switchToScene(sceneName);
      this.scenes.push(sceneName);
      this.activeLink = sceneName;
      this.router.navigateByUrl(`/scene/${sceneName}`);
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    //condition true
    const isSubmitted = form && form.submitted;
    //false
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
