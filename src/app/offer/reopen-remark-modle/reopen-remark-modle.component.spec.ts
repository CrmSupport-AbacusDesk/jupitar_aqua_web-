import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenRemarkModleComponent } from './reopen-remark-modle.component';

describe('ReopenRemarkModleComponent', () => {
  let component: ReopenRemarkModleComponent;
  let fixture: ComponentFixture<ReopenRemarkModleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReopenRemarkModleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReopenRemarkModleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
