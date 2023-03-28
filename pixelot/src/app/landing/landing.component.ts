import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectDialogComponent } from 'app/new-project-dialog/new-project-dialog.component';
import { OpenProjectDialogComponent } from 'app/open-project-dialog/open-project-dialog.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(public dialog: MatDialog) {}

  openProjectDialog(): void {
    this.dialog.open(OpenProjectDialogComponent, {
      width: '400px'
    });
  }

  newProjectDialog(): void {
    this.dialog.open(NewProjectDialogComponent, {
      width: '400px'
    });
  }
}
