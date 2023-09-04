import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styles: [
    `#captcha-container {
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
}`,
  ],
})
export class CaptchaComponent {
  constructor(private router: Router) {}

  onVerify(token: string) {
    console.log('VERIFIED');
    console.log(token);
    this.router.navigate(['results']);
  }
  onExpired(token: string) {
    console.log('EXPIRED');
    console.log(token);
  }
  onError(token: string) {
    console.log('ERROR');
    console.log(token);
  }
}
