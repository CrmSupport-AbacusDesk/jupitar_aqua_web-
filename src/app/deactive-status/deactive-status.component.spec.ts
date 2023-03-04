import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveStatusComponent } from './deactive-status.component';

describe('DeactiveStatusComponent', () => {
  let component: DeactiveStatusComponent;
  let fixture: ComponentFixture<DeactiveStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactiveStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactiveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
