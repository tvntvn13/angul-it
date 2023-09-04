import { Injectable } from '@angular/core';
import { CaptchaService } from './captcha.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResultGuardService {
  constructor(private captchaService: CaptchaService, private router: Router) {}

  canActivate(): boolean {
    if (
      this.captchaService.isLevelCompleted('level1') &&
      this.captchaService.isLevelCompleted('level2') &&
      this.captchaService.isLevelCompleted('level3')
    ) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
