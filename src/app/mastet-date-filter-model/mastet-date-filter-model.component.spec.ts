import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastetDateFilterModelComponent } from './mastet-date-filter-model.component';

describe('MastetDateFilterModelComponent', () => {
  let component: MastetDateFilterModelComponent;
  let fixture: ComponentFixture<MastetDateFilterModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastetDateFilterModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastetDateFilterModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
