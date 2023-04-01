import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsEditorComponent } from './systems-editor.component';

describe('SystemsEditorComponent', () => {
  let component: SystemsEditorComponent;
  let fixture: ComponentFixture<SystemsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
