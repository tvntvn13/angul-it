import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { LevelResult } from '../interface/level-result';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  state: Map<string, LevelResult>;
  forward = faForward;
  canSkip = false;

  constructor(private router: Router, private stateService: StateService) {
    this.stateService = stateService;
    this.router = router;
    this.state = this.stateService.getState();
    this.canSkip = this.stateService.getHighestCompleted() >= 1;
  }

  goToCaptchas() {
    if (this.state.size != 0) this.stateService.resetState();
    this.stateService.initCurrentLevel();
    this.router.navigate(['level1']);
  }

  move(event: MouseEvent, level: string): void {
    event.preventDefault();
    this.router.navigate([level]);
  }
}
