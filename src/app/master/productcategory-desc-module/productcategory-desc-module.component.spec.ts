import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategoryDescModuleComponent } from './productcategory-desc-module.component';

describe('ProductcategoryDescModuleComponent', () => {
  let component: ProductcategoryDescModuleComponent;
  let fixture: ComponentFixture<ProductcategoryDescModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcategoryDescModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcategoryDescModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
