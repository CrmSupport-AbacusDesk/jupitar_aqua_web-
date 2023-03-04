import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportcodeComponent } from './importcode.component';

describe('ImportcodeComponent', () => {
  let component: ImportcodeComponent;
  let fixture: ComponentFixture<ImportcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
