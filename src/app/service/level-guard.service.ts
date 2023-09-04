import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaService } from './captcha.service';

@Injectable({
  providedIn: 'root',
})
export class LevelGuardService {
  constructor(private captchaService: CaptchaService, private router: Router) {}

  canActivate(): boolean {
    if (this.captchaService.isLevelCompleted('level1')) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
