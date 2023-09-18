import { transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fade, left, right } from '../animations/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-captcha',
  template: `<div [@animateRoutes]="animationState">
    <router-outlet (activate)="onActivate()"></router-outlet>
  </div>`,
  animations: [
    trigger('animateRoutes', [
      transition(':increment', right),
      transition(':decrement', left),
      transition('void => *', fade),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaComponent {
  animationState: number;

  constructor(private route: ActivatedRoute) {
    const initialState = this.route.firstChild?.snapshot.data['idx'];
    if (!initialState) {
      this.animationState = this.route.firstChild?.snapshot.data['idx'];
    } else this.animationState = 0;
  }

  onActivate() {
    this.animationState = this.route.firstChild?.snapshot.data['idx'];
  }
}
