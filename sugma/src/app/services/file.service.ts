import { Injectable } from '@angular/core';
import { FileElement } from 'app/file-explorer/model/file-element';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 } from 'uuid';

export interface IFileService {
  add(fileElement: FileElement):FileElement;
  delete(id: string):void;
  update(id: string, update: Partial<FileElement>):void;
  queryInFolder(folderId: string): Observable<FileElement[]>;
  get(id: string): FileElement;
}

@Injectable({
  providedIn: 'root'
})
export class FileService implements IFileService {
  private map = new Map<string, FileElement>();
  private querySubject?: BehaviorSubject<FileElement[]>

  constructor() {}

  add(fileElement: FileElement) {
    fileElement.id = v4();
    this.map.set(fileElement.id, this.clone(fileElement));
    return fileElement;
  }

  delete(id: string) {
    this.map.delete(id);
  }

  update(id: string, update: Partial<FileElement>) {
    let element = this.map.get(id);
    if (element) {
      element = Object.assign(element, update);
      this.map.set(element.id, element);
    }
  }

  queryInFolder(folderId: string) {
    const result: FileElement[] = []
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element))
      }
    })
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result)
    } else {
      this.querySubject.next(result)
    }
    return this.querySubject.asObservable()
  }

  get(id: string) {
    let elem = this.map.get(id);
    if (elem) return elem;
    else throw new Error("Id does not exist");
  }

  clone(element: FileElement) {
    return JSON.parse(JSON.stringify(element))
  }
}