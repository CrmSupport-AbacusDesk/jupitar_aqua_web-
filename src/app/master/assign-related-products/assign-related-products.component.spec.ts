import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRelatedProductsComponent } from './assign-related-products.component';

describe('AssignRelatedProductsComponent', () => {
  let component: AssignRelatedProductsComponent;
  let fixture: ComponentFixture<AssignRelatedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRelatedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRelatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
