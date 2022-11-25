import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})


export class ToolbarComponent {

  constructor() { 
    let nw = window.nw;
    if (nw) {
      let menu = new nw.Menu({ type: 'menubar' });

      let file = new nw.Menu();
      file.append(new nw.MenuItem({ label: 'Open' }));
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
}
