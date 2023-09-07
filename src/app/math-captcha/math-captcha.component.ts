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
  ) {
    this.helper = new Helper();
    this.captcha = this.helper.generateCaptcha();
  }
  ngAfterViewInit(): void {
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'animate-in');
    }
    setTimeout(() => {
      this.renderer.removeClass(this.container?.nativeElement, 'animate-in');
    }, 500);
  }

  helper: Helper;
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
    this.captcha = this.helper.generateCaptcha();
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

class Helper {
  private numbers = new Map<number, string>([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
    [4, 'four'],
    [5, 'five'],
    [6, 'six'],
    [7, 'seven'],
    [8, 'eight'],
    [9, 'nine'],
    [10, 'ten'],
  ]);

  private operators = ['minus', 'plus'];

  generateCaptcha(): { question: string; answer: number } {
    const num1 = Math.ceil(Math.random() * 10);
    const num2 = Math.ceil(Math.random() * 10);
    const num3 = Math.ceil(Math.random() * 10);

    const ops1 = this.operators[Math.round(Math.random() * 1)];
    const plus = ops1 === 'plus';
    const ops2 = plus ? this.operators[0] : this.operators[1];

    const answer = plus ? num1 + num2 - num3 : num1 - num2 + num3;
    const question = `${this.numbers.get(num1)} ${ops1} ${
      this.numbers.get(num2)
    } ${ops2} ${this.numbers.get(num3)}`;

    console.log('\n\n', answer);
    return { question: question, answer: answer };
  }
}
