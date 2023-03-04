import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KarigarDetailModuleComponent } from './karigar-detail-module.component';

describe('KarigarDetailModuleComponent', () => {
  let component: KarigarDetailModuleComponent;
  let fixture: ComponentFixture<KarigarDetailModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KarigarDetailModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KarigarDetailModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
