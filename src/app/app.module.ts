import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
import { MathCaptchaComponent } from './math-captcha/math-captcha.component';
import { TextCaptchaComponent } from './text-captcha/text-captcha.component';
import { ImageCaptchaComponent } from './image-captcha/image-captcha.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CaptchaComponent } from './captcha/captcha.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CaptchaComponent,
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
    FormsModule,
    FontAwesomeModule,
    ToastModule,
  ],
  providers: [
    {
      provide: MessageService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
