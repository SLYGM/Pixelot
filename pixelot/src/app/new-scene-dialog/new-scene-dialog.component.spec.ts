import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSceneDialogComponent } from './new-scene-dialog.component';

describe('NewSceneDialogComponent', () => {
  let component: NewSceneDialogComponent;
  let fixture: ComponentFixture<NewSceneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSceneDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSceneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
