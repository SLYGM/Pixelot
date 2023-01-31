import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SceneDataService } from 'app/services/scene-data.service';
import * as engine from 'retro-engine';

const nw = (window as any).nw;
const fs = nw.require("fs");

@Component({
  selector: 'app-open-project-dialog',
  templateUrl: './open-project-dialog.component.html',
  styleUrls: ['./open-project-dialog.component.scss']
})
export class OpenProjectDialogComponent {
  projects: string[] = [];

  constructor(public dialogRef: MatDialogRef<OpenProjectDialogComponent>, private router: Router, private sceneData: SceneDataService) {}

  ngOnInit() {
    fs.readdir("../sugma/projects", (err: any, files: any[]) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach(file => {
          // make sure we only get directories
          if (fs.statSync("../sugma/projects/" + file).isDirectory()) {
            // make sure the directory has a project.json
            if (fs.existsSync("../sugma/projects/" + file + "/project.json")) {
              this.projects.push(file);
            }
          }
        });
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  async projectSelected(project: string) {
    this.dialogRef.close();
    const projectPath = "../sugma/projects/" + project + "/";

    // load start scene from project.json
    const projectJson = JSON.parse(fs.readFileSync(projectPath + "project.json", "utf8"));
    const scene = JSON.parse(fs.readFileSync(projectPath + "scenes/" + projectJson.start_scene + ".json", "utf8"));
    const sceneName = scene['name'];
    this.sceneData.add(sceneName, scene);

    // initialize engine
    await engine.doProjectImports(project);
    engine.Game.loadGame(projectPath);
    const startScene = engine.Game.start_scene;
    // preload the start scene
    engine.SceneManager.preLoadScene(startScene, engine.FileUtils.findFile(startScene + ".json", projectPath));
    engine.Game.start(true);
    this.router.navigate(["/scene/" + sceneName]);
  }
}
