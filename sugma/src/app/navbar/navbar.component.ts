import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { SceneManagerService } from 'app/services/scene-manager.service';
import { Scene } from 'types';
import { NewSceneDialogComponent } from 'app/new-scene-dialog/new-scene-dialog.component';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

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

  constructor(public sceneManager: SceneManagerService, public dialog: MatDialog) { }

  handleFileSelect(e: any) {
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
    let scene = new Scene(sceneName);
    this.sceneManager.addScene(scene);
    console.log(scene);
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
