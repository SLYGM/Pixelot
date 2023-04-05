import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from 'app/services/file.service';
import { Scene } from 'app/services/scene-data.service';
import { ProjDataService } from 'app/services/proj-data.service';

const nw = (window as any).nw;
const fs = nw.require("fs");
const path = nw.require("path");


@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.scss']
})
export class NewProjectDialogComponent {

  projectName: string = "";
  width: number = 426;
  height: number = 240;

  constructor(private dialogRef: MatDialogRef<NewProjectDialogComponent>, private snackBar: MatSnackBar, private fileService: FileService,
    private projService: ProjDataService) {}

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
    const projectPath = "./projects/" + this.projectName;

    // make sure the project doesn't already exist
    if (fs.existsSync(projectPath)) {
      this.snackBar.open("Project with the same name already exists", "OK", {
        duration: 2000,
      });
      return;
    }

    fs.mkdirSync(projectPath);

    this.projService.newProject(this.projectName, {width: this.width, height: this.height});

    // create the initial scene
    fs.mkdirSync(projectPath + "/scenes");
    const scene = new Scene("main");
    const sceneJson = JSON.stringify(scene, null, 2);
    fs.writeFile(projectPath + "/scenes/main.scene", sceneJson, (err: any) => {
      if (err) {
        console.error(err);
        this.snackBar.open("An error occurred while creating the project", "OK", {
          duration: 2000,
        });
      }
    });
    this.fileService.proj_name = this.projectName;

    // copy in the base_scripts
    fs.cpSync("./base_scripts", path.join(projectPath, "./base_scripts"), {recursive: true});
    this.dialogRef.close();
  }

}
