import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEditDialogComponent } from './claim-edit-dialog.component';

describe('ClaimEditDialogComponent', () => {
  let component: ClaimEditDialogComponent;
  let fixture: ComponentFixture<ClaimEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimEditDialogComponent]
    });
    fixture = TestBed.createComponent(ClaimEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
