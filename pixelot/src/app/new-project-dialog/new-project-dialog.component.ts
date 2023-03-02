import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Scene } from 'app/services/scene-data.service';

const nw = (window as any).nw;
const fs = nw.require("fs");

export type Project = {
  resolution: number[];
  start_scene: string;
  layers: string[];
  textures: object[];
  shaders: object[];
};

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.scss']
})
export class NewProjectDialogComponent {

  projectName: string = "";
  width: number = 426;
  height: number = 240;

  constructor(private dialogRef: MatDialogRef<NewProjectDialogComponent>, private snackBar: MatSnackBar) {}

  onCancelClick() {
    this.dialogRef.close();
  }

  onCreateClick() {
    // make sure the project name doesn't contain any invalid characters
    if (!this.projectName.match(/^[a-zA-Z0-9_\-]+$/)) {
      this.snackBar.open("Project name can only contain letters, numbers, dashes, and underscores.", "OK", {
        duration: 5000
      });
      return;
    }
    const projectPath = "../pixelot/projects/" + this.projectName;

    // make sure the project doesn't already exist
    if (fs.existsSync(projectPath)) {
      this.snackBar.open("Project with the same name already exists", "OK", {
        duration: 2000,
      });
      return;
    }

    fs.mkdirSync(projectPath);

    const project: Project = {
      resolution: [this.width, this.height],
      start_scene: "scene1",
      layers: ["Background", "Foreground", "UI"],
      textures: [],
      shaders: []
    };

    // create the project file
    const json = JSON.stringify(project, null, 2);
    fs.writeFile(projectPath + "/project.proj", json, (err: any) => {
      if (err) {
        console.error(err);
        this.snackBar.open("An error occurred while creating the project", "OK", {
          duration: 2000,
        });
      }
    });

    // create the initial scene
    fs.mkdirSync(projectPath + "/scenes");
    const scene = new Scene("scene1");
    const sceneJson = JSON.stringify(scene, null, 2);
    fs.writeFile(projectPath + "/scenes/scene1.scene", sceneJson, (err: any) => {
      if (err) {
        console.error(err);
        this.snackBar.open("An error occurred while creating the project", "OK", {
          duration: 2000,
        });
      }
    });

    this.dialogRef.close();
  }

}