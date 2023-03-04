import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitallistComponent } from './digitallist.component';

describe('DigitallistComponent', () => {
  let component: DigitallistComponent;
  let fixture: ComponentFixture<DigitallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
