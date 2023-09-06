import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathCaptchaComponent } from './math-captcha.component';

describe('MathCaptchaComponent', () => {
  let component: MathCaptchaComponent;
  let fixture: ComponentFixture<MathCaptchaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MathCaptchaComponent]
    });
    fixture = TestBed.createComponent(MathCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
