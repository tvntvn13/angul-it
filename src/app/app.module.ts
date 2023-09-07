import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { CaptchaComponent } from './captcha/captcha.component';
import { ResultComponent } from './result/result.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
// import { NgHcaptchaModule, NgHcaptchaService } from 'ng-hcaptcha';
import { SamesiteService } from './service/samesite.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { MathCaptchaComponent } from './math-captcha/math-captcha.component';
import { TextCaptchaComponent } from './text-captcha/text-captcha.component';
import { ImageCaptchaComponent } from './image-captcha/image-captcha.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// import { environment } from '../environment/environment.ts'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // CaptchaComponent,
    ResultComponent,
    MathCaptchaComponent,
    TextCaptchaComponent,
    ImageCaptchaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RecaptchaModule,
    // RecaptchaV3Module,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastModule,
    // NgHcaptchaModule.forRoot({
    //   siteKey: '0b6202c2-5a70-4f4d-ac55-c401130fcaeb',
    // }),
  ],
  providers: [{
    //   provide: RECAPTCHA_V3_SITE_KEY,
    //   useValue: '6LcbjOEnAAAAAJLntZ6noTcO4JGI2tkUVDa_oZih',
    //   // useValue: environment.recaptcha.siteKey,
    // }, {
    provide: HTTP_INTERCEPTORS,
    useClass: SamesiteService,
    multi: true,
    // }, {
    //   provide: NgHcaptchaService,
    //   useValue: '0b6202c2-5a70-4f4d-ac55-c401130fcaeb',
  }, {
    provide: MessageService,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
