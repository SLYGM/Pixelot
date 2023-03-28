import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneTabComponent } from './scene-tab.component';

describe('SceneTabComponent', () => {
  let component: SceneTabComponent;
  let fixture: ComponentFixture<SceneTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceneTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
