import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as engine from 'retro-engine';

@Component({
  selector: 'app-build-dialogue',
  templateUrl: './build-dialogue.component.html',
  styleUrls: ['./build-dialogue.component.scss']
})
export class BuildDialogueComponent {
  targets = ["Windows", "Mac", "Linux"];
  selectedTarget: string = "Windows";
  selectedPath: string = "";
  pathForm = new FormControl('');
  constructor(public dialogRef: MatDialogRef<BuildDialogueComponent>) {}

  onCancelClick() {
    this.dialogRef.close(null);
  }

  onBuildClick() {
    this.dialogRef.close({target: this.selectedTarget, path: this.selectedPath});
  }

  handleFileSelect(evt: any) {
    const file_input = document.getElementById('folderPicker');
    const files = (file_input as any).files;
    this.selectedPath = files[0].path;
    this.pathForm.setValue(this.selectedPath);
  }
}
