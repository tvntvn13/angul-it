import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { MathCaptchaComponent } from './math-captcha/math-captcha.component';
import { TextCaptchaComponent } from './text-captcha/text-captcha.component';
import { ImageCaptchaComponent } from './image-captcha/image-captcha.component';
import { levelGuard } from './service/level.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: { idx: 0 },
  },
  {
    path: 'level1',
    component: MathCaptchaComponent,
    data: { idx: 1 },
    // canActivate: [levelGuard('level1')],
  },
  {
    path: 'level2',
    component: TextCaptchaComponent,
    canActivate: [levelGuard('level2')],
    data: { idx: 2 },
  },
  {
    path: 'level3',
    component: ImageCaptchaComponent,
    canActivate: [levelGuard('level3')],
    data: { idx: 3 },
  },
  {
    path: 'results',
    component: ResultComponent,
    canActivate: [levelGuard('results')],
    data: { idx: 4 },
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
