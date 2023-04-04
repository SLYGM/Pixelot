import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { NewSceneDialogComponent } from 'app/new-scene-dialog/new-scene-dialog.component';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as engine from 'retro-engine';
import { SceneDataService, Scene } from 'app/services/scene-data.service';
import { FileService } from 'app/services/file.service';

const nw = (window as any).nw;
const path = nw.require("path");

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  activeLink: string;
  background: ThemePalette = 'primary';
  accent: ThemePalette = 'accent'
  scenes: string[] = [];

  constructor(public dialog: MatDialog, private sceneData: SceneDataService, private router: Router, private route: ActivatedRoute, private fileService: FileService) {
    this.scenes = [ ...engine.SceneManager.loaded_scenes.keys() ];
    this.route.params.subscribe(params => {
      this.activeLink = params['sceneName'];
    });
  }

  handleFileSelect(e: any) {
    let files = e.target.files;
    let file = files[0];
    let path: string = file.path;
    let sceneName: string;
    let reader = new FileReader();
    reader.onload = (e: any) => {
      if (e.target) {
        let scene = JSON.parse(e.target.result as string);
        console.log(scene);
        sceneName = scene['name'];
        this.sceneData.add(sceneName, scene, path);
      }
    };
    reader.onloadend = (_e: any) => {
      console.log(sceneName);
      engine.SceneManager.preLoadScene(sceneName);
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
    //create new scene in engine
    const ui_scene = new Scene(sceneName);
    const scenePath = path.join(this.fileService.path, `${sceneName}.scene`);
    this.sceneData.add(sceneName, ui_scene, scenePath);
    this.sceneData.saveSceneSync(sceneName);
    
    // load scene in engine
    engine.SceneManager.preLoadScene(sceneName);
    this.scenes = [ ...engine.SceneManager.loaded_scenes.keys() ];
    // switch to scene
    engine.SceneManager.switchToScene(sceneName, false);
    this.activeLink = sceneName;
    this.router.navigate([`/scene/${sceneName}`]);
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
