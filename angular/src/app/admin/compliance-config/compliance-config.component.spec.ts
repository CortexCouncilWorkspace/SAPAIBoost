import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceConfigComponent } from './compliance-config.component';

describe('ComplianceConfigComponent', () => {
  let component: ComplianceConfigComponent;
  let fixture: ComponentFixture<ComplianceConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplianceConfigComponent]
    });
    fixture = TestBed.createComponent(ComplianceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
