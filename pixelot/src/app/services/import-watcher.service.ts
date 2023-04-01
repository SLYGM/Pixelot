import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportWatcherService {
  private systemUpdate: Subject<void> = new Subject();

  getSystemUpdate(): Observable<void> {
    return this.systemUpdate.asObservable();
  }

  updateSystems() {
    this.systemUpdate.next();
  }
}
