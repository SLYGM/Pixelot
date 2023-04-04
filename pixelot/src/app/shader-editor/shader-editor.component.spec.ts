import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaderEditorComponent } from './shader-editor.component';

describe('ShaderEditorComponent', () => {
  let component: ShaderEditorComponent;
  let fixture: ComponentFixture<ShaderEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShaderEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShaderEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
