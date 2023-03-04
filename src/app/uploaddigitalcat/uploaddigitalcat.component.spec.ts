import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaddigitalcatComponent } from './uploaddigitalcat.component';

describe('UploaddigitalcatComponent', () => {
  let component: UploaddigitalcatComponent;
  let fixture: ComponentFixture<UploaddigitalcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaddigitalcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaddigitalcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
