import { Component } from '@angular/core';
import { FileExplorerComponent } from 'app/file-explorer/file-explorer.component';
import { FileElement } from 'app/file-explorer/model/file-element';
import { FileService } from 'app/services/file.service';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';

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

  constructor(public fileService: FileService) {
    this.currentPath = fileService.path;
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
}
