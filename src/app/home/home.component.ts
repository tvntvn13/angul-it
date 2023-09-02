import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToCaptchas() {
    console.log('here we go..');
    this.router.navigate(['/level1']);
  }

  // public send(form: NgForm): void {
  //   if (form.invalid) {
  //     for (const control of Object.keys(form.controls)) {
  //       form.controls[control].markAsTouched();
  //     }
  //     return;
  //   }

  //   this.recaptchaV3Service.execute('importantAction')
  //     .subscribe((token: string) => {
  //       console.debug(`token [${token}] generated`);
  //     });
  // }
  // resolved(captchaResponse: string) {
  //   console.log(`resolved captcha with response: ${captchaResponse}`);
}
// constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

// public executeImportantAction(): void {
//   this.recaptchaV3Service.execute('importantAction')
//     .subscribe((token) => this.handleToken(token));
// }

// private handleToken(token: string) {
//   console.log(token);
// }
