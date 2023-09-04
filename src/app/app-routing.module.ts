import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CaptchaComponent } from './captcha/captcha.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { MathCaptchaComponent } from './math-captcha/math-captcha.component';
import { TextCaptchaComponent } from './text-captcha/text-captcha.component';
import { ImageCaptchaComponent } from './image-captcha/image-captcha.component';
// import { LevelGuardService } from './service/level-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'level1', component: MathCaptchaComponent },
  {
    path: 'level2',
    component: TextCaptchaComponent,
    // canActivate: [LevelGuardService],
  },
  // { path: 'level3', component: CaptchaComponent },
  { path: 'level3', component: ImageCaptchaComponent },
  { path: 'results', component: ResultComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
