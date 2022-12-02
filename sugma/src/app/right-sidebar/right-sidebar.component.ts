import { Component, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Entity } from 'types';
import { ImportManager } from 'retro-engine';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent {
  @Input() entity?: Entity;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponentDialog, {
      width: '500px',
      data: this.entity,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (this.entity && result) {
        if (this.entity.components.some(c => c.component_name === result)) {
          this._snackBar.open('Component already exists', 'Close', {
            duration: 2000,
          });
        } else {
          // TODO: Get component data and add it to the entity
        }
      }
    });
  }
}

@Component({
  selector: 'add-component-dialog',
  templateUrl: 'add-component-dialog.html',
})
export class AddComponentDialog {
  formControl = new FormControl('');
  // TODO: Get available components
  options: string[] = ImportManager.getAllComponents();
  filteredOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<AddComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public entity: Entity,
  ) {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    const componentName = this.formControl.value;
    this.dialogRef.close(componentName);
  }
}
