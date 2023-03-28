import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'app/navbar/navbar.component';

@Component({
  selector: 'app-new-scene-dialog',
  templateUrl: './new-scene-dialog.component.html',
  styleUrls: ['./new-scene-dialog.component.scss']
})
export class NewSceneDialogComponent {
  sceneName: string | undefined;
  validation = false;
  constructor(public dialogRef: MatDialogRef<NewSceneDialogComponent>) { }

  sceneNameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  createScene(): void {
    if (this.sceneName) {
      this.dialogRef.close(this.sceneName);
    }
    this.validation = true;
  }
}
