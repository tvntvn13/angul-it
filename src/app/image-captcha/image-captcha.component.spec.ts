import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCaptchaComponent } from './image-captcha.component';

describe('ImageCaptchaComponent', () => {
  let component: ImageCaptchaComponent;
  let fixture: ComponentFixture<ImageCaptchaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCaptchaComponent]
    });
    fixture = TestBed.createComponent(ImageCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
