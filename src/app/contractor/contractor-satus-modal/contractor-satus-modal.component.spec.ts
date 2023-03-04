import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSatusModalComponent } from './contractor-satus-modal.component';

describe('ContractorSatusModalComponent', () => {
  let component: ContractorSatusModalComponent;
  let fixture: ComponentFixture<ContractorSatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorSatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorSatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
