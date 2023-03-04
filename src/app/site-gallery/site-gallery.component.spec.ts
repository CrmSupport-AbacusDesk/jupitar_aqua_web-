import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteGalleryComponent } from './site-gallery.component';

describe('SiteGalleryComponent', () => {
  let component: SiteGalleryComponent;
  let fixture: ComponentFixture<SiteGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
