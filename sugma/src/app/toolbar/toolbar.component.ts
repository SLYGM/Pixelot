import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OpenProjectDialogComponent } from 'app/open-project-dialog/open-project-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})


export class ToolbarComponent {

  constructor(public dialog: MatDialog, private zone: NgZone) {
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
      file.append(new nw.MenuItem({ label: 'New' }));
      file.append(new nw.MenuItem({ label: 'Save' }));
      file.append(new nw.MenuItem({ label: 'Save As' }));
      menu.append(new nw.MenuItem({ label: 'File', submenu: file }));

      let edit = new nw.Menu();
      edit.append(new nw.MenuItem({ label: 'Undo' }));
      edit.append(new nw.MenuItem({ label: 'Redo' }));
      edit.append(new nw.MenuItem({ label: 'Preferences' }));
      menu.append(new nw.MenuItem({ label: 'Edit', submenu: edit }));

      let help = new nw.Menu();
      help.append(new nw.MenuItem({ label: 'About' }));
      menu.append(new nw.MenuItem({ label: 'Help', submenu: help }));

      nw.Window.get().menu = menu;
    }
  }

  openProjectDialog(): void {
    this.dialog.open(OpenProjectDialogComponent, {
      width: '400px'
    });
  }
}
