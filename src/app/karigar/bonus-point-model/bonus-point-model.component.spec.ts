import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusPointModelComponent } from './bonus-point-model.component';

describe('BonusPointModelComponent', () => {
  let component: BonusPointModelComponent;
  let fixture: ComponentFixture<BonusPointModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusPointModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusPointModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
