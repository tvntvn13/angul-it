import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
import { LevelResult } from '../interface/level-result';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div class="container" #homeContainer>
    <div class="header">
      <button
        class="nav-button forward"
        *ngIf="canSkip"
        (click)="skipLevel($event)"
      >
        <fa-icon [icon]="forward"></fa-icon>
      </button>
    </div>
    <div id="welcome">
      <p>
        <span class="hey">Hey,</span> and welcome.
        <br />
        To <span class="human">verify</span> you are a
        <span class="human">human,</span><br />start the<span id="tests">
          tests.</span
        >
      </p>
    </div>

    <button class="basic-button" (click)="goToCaptchas()">
      {{ canSkip ? 'RESTART' : 'START' }}
    </button>
  </div>`,
  styles: [
    `
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
      }
      #welcome {
        text-align: left;
        font-size: 1.5rem;
        color: var(--green);
        text-shadow: 0 0 5px var(--green);
        line-height: 2.5rem;
      }
      .hey {
        color: var(--yellow);
        text-shadow: 0 0 5px var(--yellow);
      }
      .human {
        color: var(--yellow);
        text-shadow: 0 0 5px var(--yellow);
      }
      #tests {
        color: var(--purple2);
        text-shadow: 0 0 4px var(--purple2);
      }
    `,
  ],
})
export class HomeComponent {
  state: Map<string, LevelResult>;
  forward = faForward;
  canSkip = false;

  constructor(private router: Router, private stateService: StateService) {
    this.state = this.stateService.getState();
    this.canSkip = this.stateService.getHighestCompleted() >= 1;
  }

  skipLevel(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['level1']);
  }

  goToCaptchas() {
    if (this.state.size != 0) this.stateService.resetState();
    this.stateService.initCurrentLevel();
    this.move();
  }

  move(): void {
    this.router.navigate(['level1']);
  }
}
