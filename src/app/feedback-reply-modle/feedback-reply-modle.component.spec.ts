import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackReplyModleComponent } from './feedback-reply-modle.component';

describe('FeedbackReplyModleComponent', () => {
  let component: FeedbackReplyModleComponent;
  let fixture: ComponentFixture<FeedbackReplyModleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackReplyModleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackReplyModleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
