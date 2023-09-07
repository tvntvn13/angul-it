import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { MathCaptchaComponent } from './math-captcha/math-captcha.component';
import { TextCaptchaComponent } from './text-captcha/text-captcha.component';
import { ImageCaptchaComponent } from './image-captcha/image-captcha.component';
// import { levelGuard } from './service/level.guard';
// import { resultGuard } from './service/result.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'level1',
    component: MathCaptchaComponent,
    // canActivate: [levelGuard('level1')],
  },
  {
    path: 'level2',
    component: TextCaptchaComponent,
    // canActivate: [levelGuard('level2')],
  },
  {
    path: 'level3',
    component: ImageCaptchaComponent,
    // canActivate: [levelGuard('level3')],
  },
  {
    path: 'results',
    component: ResultComponent,
    // canActivate: [resultGuard]
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
