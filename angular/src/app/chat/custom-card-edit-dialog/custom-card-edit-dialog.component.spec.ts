import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCardEditDialogComponent } from './custom-card-edit-dialog.component';

describe('CustomCardEditDialogComponent', () => {
  let component: CustomCardEditDialogComponent;
  let fixture: ComponentFixture<CustomCardEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCardEditDialogComponent]
    });
    fixture = TestBed.createComponent(CustomCardEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
