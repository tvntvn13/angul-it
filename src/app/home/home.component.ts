import { Component } from '@angular/core';

// import { NgForm } from '@angular/forms';
// import { RecaptchaModule } from 'ng-recaptcha';
// import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css']
  styles: [
    `.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-size: 3rem;
}`,
  ],
})
export class HomeComponent {
  // constructor(private recaptchaV3Service: ReCaptchaV3Service) {
  // }

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
  resolved(captchaResponse: string) {
    console.log(`resolved captcha with response: ${captchaResponse}`);
  }
  // constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  // public executeImportantAction(): void {
  //   this.recaptchaV3Service.execute('importantAction')
  //     .subscribe((token) => this.handleToken(token));
  // }

  // private handleToken(token: string) {
  //   console.log(token);
  // }
}
