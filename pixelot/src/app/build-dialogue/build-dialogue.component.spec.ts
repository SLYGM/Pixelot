import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildDialogueComponent } from './build-dialogue.component';

describe('BuildDialogueComponent', () => {
  let component: BuildDialogueComponent;
  let fixture: ComponentFixture<BuildDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
