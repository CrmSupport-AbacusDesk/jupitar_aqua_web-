import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponSummaryModleComponent } from './coupon-summary-modle.component';

describe('CouponSummaryModleComponent', () => {
  let component: CouponSummaryModleComponent;
  let fixture: ComponentFixture<CouponSummaryModleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponSummaryModleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponSummaryModleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
