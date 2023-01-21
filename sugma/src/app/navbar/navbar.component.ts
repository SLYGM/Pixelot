import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { NewSceneDialogComponent } from 'app/new-scene-dialog/new-scene-dialog.component';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import * as engine from 'retro-engine';

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

  constructor(public dialog: MatDialog) {
    this.scenes = [ ...engine.SceneManager.loaded_scenes.keys() ];
    this.initEngine();
  }

  // This is temporary. TODO: move to landing page
  async initEngine() {
    await engine.doImports();
  }


  handleFileSelect(e: any) {
    let files = e.target.files;
    let file = files[0];
    let path = file.path;
    const sceneName = file.name.split('.')[0];
    engine.SceneManager.preLoadScene(sceneName, path);
    this.scenes = [ ...engine.SceneManager.loaded_scenes.keys() ];
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

  createScene(sceneName: string){
    // TODO
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
