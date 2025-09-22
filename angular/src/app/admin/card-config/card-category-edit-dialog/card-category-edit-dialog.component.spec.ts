import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCategoryEditDialogComponent } from './card-category-edit-dialog.component';

describe('CardCategoryEditDialogComponent', () => {
  let component: CardCategoryEditDialogComponent;
  let fixture: ComponentFixture<CardCategoryEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardCategoryEditDialogComponent]
    });
    fixture = TestBed.createComponent(CardCategoryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
