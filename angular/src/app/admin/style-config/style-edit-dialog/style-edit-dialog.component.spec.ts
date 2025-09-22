import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleEditDialogComponent } from './style-edit-dialog.component';

describe('StyleEditDialogComponent', () => {
  let component: StyleEditDialogComponent;
  let fixture: ComponentFixture<StyleEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StyleEditDialogComponent]
    });
    fixture = TestBed.createComponent(StyleEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
