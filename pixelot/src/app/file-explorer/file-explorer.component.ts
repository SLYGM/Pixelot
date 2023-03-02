import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileElement } from './model/file-element';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from './modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './modals/rename-dialog/rename-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { NewFileDialogComponent } from './modals/new-file-dialog/new-file-dialog.component';
import { FileService } from 'app/services/file.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent {
  @Input() fileElements?: FileElement[] | null
  @Input() canNavigateUp?: boolean
  @Input() directory_path!: string

  @Output() fileAdded = new EventEmitter<{ name: string }>()
  @Output() folderAdded = new EventEmitter<{ name: string }>()
  @Output() elementRemoved = new EventEmitter<FileElement>()
  @Output() elementRenamed = new EventEmitter<FileElement>()
  @Output() elementMoved = new EventEmitter<{
    element: FileElement
    moveTo: FileElement
  }>()
  @Output() navigatedDown = new EventEmitter<FileElement>()
  @Output() navigatedUp = new EventEmitter()

  constructor(public dialog: MatDialog, public fileService: FileService) { }

  ngOnInit() {
    this.directory_path = this.fileService.path;
    this.listDirectory(this.directory_path);
    this.fileElements = [];
  }

  listDirectory(directory_path: string) {
    // Use Node.js fs module to read the contents of the directory
    const nw = (window as any).nw;
    const fs = nw.require('fs');
    fs.readdir(directory_path, (err: any, files: any[]) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }

      files.forEach(file => {
        if (fs.statSync(directory_path + file).isDirectory()) {
          this.folderAdded.emit({ name: file });
        }
        else {
          this.fileAdded.emit({ name: file });
        }
      });
    });
  }

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
    const nw = (window as any).nw;
    const fs = nw.require('fs');
    fs.unlink(this.directory_path + element.name, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File successfully deleted.');
      }
    });
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);

      const nw = (window as any).nw;
      const fs = nw.require('fs');
      fs.readdir(this.directory_path + element.name, (err: any, files: any[]) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }

        files.forEach(file => {
          if (fs.statSync(this.directory_path + file).isDirectory()) {
            this.folderAdded.emit({ name: file });
          }
          else {
            this.fileAdded.emit({ name: file });
          }
        });
      });
    }
    else {
      const nw = (window as any).nw;
      const open = nw.require('open');
      open(this.directory_path + element.name);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
    const nw = (window as any).nw;
    const fs = nw.require('fs');
    fs.rename(this.directory_path + element.name, this.directory_path + '/' + moveTo.name + '/' + element.name, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File successfully moved.');
      }
    });
  }

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.folderAdded.emit({ name: res });
        const folderPath = this.fileService.path + res;
        const nw = (window as any).nw;
        const fs = nw.require('fs');
        fs.mkdir(folderPath, { recursive: false }, err => {
          if (err) {
            console.error(`An error occurred while creating the folder: ${err}`);
            return;
          }

          console.log(`Folder ${folderPath} created successfully.`);
        });
      }
    });
  }

  openNewFileDialog() {
    let dialogRef = this.dialog.open(NewFileDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.fileAdded.emit({ name: res });
      const filePath = this.fileService.path + res;
      const content = '';
      const nw = (window as any).nw;
      const fs = nw.require('fs');
      fs.writeFile(filePath, content, err => {
        if (err) {
          console.error(`An error occurred while writing to the file: ${err}`);
          return;
        }
        console.log(`File ${filePath} created successfully.`);
        const nw = (window as any).nw;
        const open = nw.require('open');
        open(this.fileService.path + res);
      });
    });
  }

  openRenameDialog(element: FileElement) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let prev_name = element.name;
        element.name = res;
        this.elementRenamed.emit(element);

        const nw = (window as any).nw;
        const fs = nw.require('fs');
        fs.rename(this.directory_path + prev_name, this.directory_path + element.name, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('File successfully renamed.');
          }
        });
      }
    });
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }
}
