import { Component } from '@angular/core';
import { FileExplorerComponent } from 'app/file-explorer/file-explorer.component';
import { FileElement } from 'app/file-explorer/model/file-element';
import { FileService } from 'app/services/file.service';
import { Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { ViewChild, isDevMode } from '@angular/core';
import { v4 } from 'uuid';
import { ImportWatcherService } from 'app/services/import-watcher.service';

import * as engine from 'retro-engine';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent {
  fileElements?: Observable<FileElement[]>;
  currentRoot!: FileElement | null;
  currentPath!: string;
  canNavigateUp = false;
  @ViewChild('fileExplorer') fileExplorer: FileExplorerComponent;

  constructor(public fileService: FileService, public importService: ImportWatcherService) { }

  ngOnInit(): void {
    this.currentPath = this.fileService.path;
    this.setupFileWatcher();
  }

  
  //watch for changes in the directory
  setupFileWatcher() {
    const nw = (window as any).nw;
    const fs = nw.require('fs');
    const path = nw.require('path');

    fs.watch(this.currentPath, { recursive: true }, (eventType: string, filename: string) => {
      //change the backslashes to forward slashes
      filename = filename.split(path.sep).join('/');
      const file = path.parse(filename);

      if (eventType === 'rename') {
        // if the file no longer exists, then it has been deleted
        if (!fs.existsSync(path.join(this.currentPath, file.dir, file.base))) {
          if (file.ext === '.js') {
            this.removeScript(path.posix.join(file.dir, file.name));
          }
        }
        // otherwise it is newly created
        else {
          this.importScript(path.posix.join(file.dir, file.name));
        }
      }
      // if the file has been changed, then reimport it (if it is a script)
      else if (eventType === 'change') {
        if (file.ext === '.js') {
          const script_name = filename.split('.')[0];
          this.removeScript(script_name);
          this.importScript(script_name);
        }
      }
    });
  }

  removeScript(script_path: string) {
    // check the type to trigger import watcher update
    const type = engine.ImportManager.getRecord(script_path).type;
    engine.ImportManager.removeScript(script_path);
    this.updateImportService(type);
  }

  importScript(script_path: string) {
    engine.ImportManager.importScript(this.fileService.proj_name, script_path, "built")
    .then(() => {
       // check the type to trigger import watcher update
      const type = engine.ImportManager.getRecord(script_path).type;
      this.updateImportService(type);
    });
  }

  updateImportService(type: string) {
    if (type === 'system') {
      this.importService.updateSystems();
    } else if (type === 'shader') {
      this.importService.updateShaders();
    }
  }

  addFolder(folder: { name: string }) {
    this.fileService.add({ id: v4(), isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    this.updateFileElementQuery();
  }

  addFile(file: { name: string }) {
    this.fileService.add({ id: v4(), isFolder: false, name: file.name, parent: this.currentRoot ? this.currentRoot.id : 'root' });
    this.updateFileElementQuery();
  }

  removeElement(element: FileElement) {
    this.fileService.delete(element.id);
    this.updateFileElementQuery();
  }

  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id, { parent: event.moveTo.id });
    this.updateFileElementQuery();
  }

  renameElement(element: FileElement) {
    this.fileService.update(element.id, { name: element.name });
    this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
    this.fileElements.pipe()
      .subscribe((array) => {
        const sortedArray = array.sort((a, b) => Number(b.isFolder) - Number(a.isFolder));
        this.fileElements = of(sortedArray);
      });
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else if (this.currentRoot?.parent) {
      this.currentRoot = this.fileService.get(this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

  reset() {
    this.fileService.reset();
    this.currentPath = this.fileService.path;
    this.updateFileElementQuery();
  }
}
