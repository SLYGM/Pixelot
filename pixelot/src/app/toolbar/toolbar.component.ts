import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuildDialogueComponent } from 'app/build-dialogue/build-dialogue.component';
import { NewProjectDialogComponent } from 'app/new-project-dialog/new-project-dialog.component';
import { OpenProjectDialogComponent } from 'app/open-project-dialog/open-project-dialog.component';
import * as engine from 'retro-engine';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})


export class ToolbarComponent {

  constructor(public dialog: MatDialog, private zone: NgZone, private router: Router) {
    let nw = window.nw;
    if (nw) {
      let menu = new nw.Menu({ type: 'menubar' });

      let file = new nw.Menu();
      file.append(new nw.MenuItem({
        label: 'Open',
        click: () => {
          this.zone.run(() => {
            this.openProjectDialog();
          });
        }
      }));
      file.append(new nw.MenuItem({
        label: 'New Project',
        click: () => {
          this.zone.run(() => {
            this.newProjectDialog();
          });
        }
      }));
      file.append(new nw.MenuItem({
        label: 'Close Project',
        click: () => {
          this.zone.run(() => {
            this.router.navigate(['/']);
          });
        }
      }));
      menu.append(new nw.MenuItem({ label: 'File', submenu: file }));

      let game = new nw.Menu();
      game.append(new nw.MenuItem({
        label: 'Run',
        click: () => {
          engine.Game.render_only = false;
        }
      }));
      game.append(new nw.MenuItem({ 
        label: 'Build' ,
        click: () => {
          const dialogRef = this.dialog.open(BuildDialogueComponent, {
            width: '400px'
          })

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              engine.Builder.build(result.path, result.target);
            }
          });
        }
      }));
      menu.append(new nw.MenuItem({ label: 'Game', submenu: game }));

      const open = nw.require('open');

      let help = new nw.Menu();
      help.append(new nw.MenuItem({
        label: 'Open Documentation',
        click: () => {
          open('https://github.com/SLYGM/RetroEngineTM/blob/master/docs/modules.md');
        }
      }));
      help.append(new nw.MenuItem({
        label: 'Open GitHub Repository',
        click: () => {
          open('https://github.com/SLYGM/RetroEngineTM/');
        }
      }));
      help.append(new nw.MenuItem({
        label: 'Version: ' + nw.App.manifest.version,
        enabled: false
      }));
      menu.append(new nw.MenuItem({ label: 'Help', submenu: help }));

      nw.Window.get().menu = menu;
    }
  }

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
