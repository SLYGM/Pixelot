import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportWatcherService {
  private systemUpdate: Subject<void> = new Subject();
  private shaderUpdate: Subject<void> = new Subject();

  getSystemUpdate(): Observable<void> {
    return this.systemUpdate.asObservable();
  }

  updateSystems() {
    this.systemUpdate.next();
  }

  getShaderUpdate(): Observable<void> {
    return this.shaderUpdate.asObservable();
  }

  updateShaders() {
    this.shaderUpdate.next();
  }
}
