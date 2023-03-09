import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCouponCodeComponent } from './assign-coupon-code.component';

describe('AssignCouponCodeComponent', () => {
  let component: AssignCouponCodeComponent;
  let fixture: ComponentFixture<AssignCouponCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignCouponCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCouponCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
