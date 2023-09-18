import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  @ViewChild('container')
    container: ElementRef | undefined;
  level1Result: string;
  level2Result: string;
  level3Result: string;
  backward = faBackward;

  constructor(private router: Router, private stateService: StateService) {
    this.level1Result = this.stateService.calculatePercentage('level1');
    this.level2Result = this.stateService.calculatePercentage('level2');
    this.level3Result = this.stateService.calculatePercentage('level3');
  }

  goToHome(event: MouseEvent) {
    event.preventDefault();
    this.stateService.resetState();
    this.router.navigate(['home']);
  }

  goBack(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['level3']);
  }
}
