import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KarigarDataComponent } from './karigar-data.component';

describe('KarigarDataComponent', () => {
  let component: KarigarDataComponent;
  let fixture: ComponentFixture<KarigarDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KarigarDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KarigarDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
