import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../service/state.service';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements AfterViewInit {
  @ViewChild('container')
    container: ElementRef | undefined;
  level1Result: string;
  level2Result: string;
  level3Result: string;
  backward = faBackward;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private stateService: StateService,
  ) {
    this.level1Result = this.stateService.calculatePercentage('level1');
    this.level2Result = this.stateService.calculatePercentage('level2');
    this.level3Result = this.stateService.calculatePercentage('level3');
  }

  ngAfterViewInit(): void {
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'animate-in');
    }
    setTimeout(() => {
      this.renderer.removeClass(this.container?.nativeElement, 'animate-in');
    }, 500);
    console.log(this.stateService.getState());
  }

  goToHome(event: MouseEvent) {
    event.preventDefault();
    this.stateService.resetState();
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'animate-out');
      setTimeout(() => {
        this.move();
      }, 500);
    }
  }

  goBack(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['level3']);
  }

  move(): void {
    this.stateService.resetState();
    this.router.navigate(['home']);
  }
}
