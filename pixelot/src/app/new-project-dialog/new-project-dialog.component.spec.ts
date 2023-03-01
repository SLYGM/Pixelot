import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectDialogComponent } from './new-project-dialog.component';

describe('NewProjectDialogComponent', () => {
  let component: NewProjectDialogComponent;
  let fixture: ComponentFixture<NewProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProjectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
