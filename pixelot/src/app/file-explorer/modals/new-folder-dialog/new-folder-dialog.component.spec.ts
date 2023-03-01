import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFolderDialogComponent } from './new-folder-dialog.component';

describe('NewFolderDialogComponent', () => {
  let component: NewFolderDialogComponent;
  let fixture: ComponentFixture<NewFolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFolderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
