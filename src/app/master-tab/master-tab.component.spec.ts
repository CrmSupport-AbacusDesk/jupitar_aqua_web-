import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTabComponent } from './master-tab.component';

describe('MasterTabComponent', () => {
  let component: MasterTabComponent;
  let fixture: ComponentFixture<MasterTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
