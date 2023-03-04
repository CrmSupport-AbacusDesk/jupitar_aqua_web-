import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeMasterComponent } from './coupon-code-master.component';

describe('CouponCodeMasterComponent', () => {
  let component: CouponCodeMasterComponent;
  let fixture: ComponentFixture<CouponCodeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponCodeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
