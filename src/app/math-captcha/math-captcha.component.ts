import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { MathService } from '../service/math.service';

@Component({
  selector: 'app-math-captcha',
  templateUrl: './math-captcha.component.html',
  styleUrls: ['./math-captcha.component.css'],
})
export class MathCaptchaComponent implements AfterViewInit {
  @ViewChild('container')
    container: ElementRef | undefined;
  constructor(
    private router: Router,
    private messageService: MessageService,
    private renderer: Renderer2,
    private mathService: MathService,
  ) {
    this.captcha = this.mathService.generateCaptcha();
  }
  ngAfterViewInit(): void {
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'animate-in');
    }
    setTimeout(() => {
      this.renderer.removeClass(this.container?.nativeElement, 'animate-in');
    }, 500);
  }

  captcha: { question: string; answer: number };
  userValue = '';
  congratsOpacity = 0;
  congratsMessage = 'TEMP';
  completed = false;
  failed = false;
  refreshIcon = faArrowRotateRight;

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (parseInt(this.userValue, 10) === this.captcha.answer) {
      this.congratsMessage = 'CONGRATS!';
      this.congratsOpacity = 1;
      this.completed = true;
      this.showSuccess();
    } else {
      this.failed = true;
      this.congratsMessage = 'WRONG!';
      this.congratsOpacity = 1;
      this.showFail();
    }
  }

  showSuccess(): void {
    this.messageService.add({
      key: 'tr',
      severity: 'success',
      summary: 'Congrats!',
      detail: 'You cleared the captcha!',
    });
  }

  showFail(): void {
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: 'Oops!',
      detail: 'You failed, try again.',
    });
  }

  refreshCaptcha(event: MouseEvent): void {
    event.preventDefault();
    this.captcha = this.mathService.generateCaptcha();
    this.userValue = '';
    this.congratsOpacity = 0;
    this.congratsMessage = 'TEMP';
    this.failed = false;
    this.completed = false;
  }

  goToNext(event: MouseEvent): void {
    event.preventDefault();
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'animate-out');
      setTimeout(() => {
        this.move();
      }, 500);
    }
  }

  move(): void {
    this.router.navigate(['level2']);
  }
}
