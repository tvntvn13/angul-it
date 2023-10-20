import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowRotateRight,
  faBackward,
  faForward,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { MathService } from '../service/math.service';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-math-captcha',
  templateUrl: './math-captcha.component.html',
  styleUrls: ['./math-captcha.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MathCaptchaComponent implements AfterViewInit {
  @ViewChild('inputField')
    input: ElementRef | undefined;
  @ViewChild('w1')
    word1: ElementRef | undefined;
  @ViewChild('w2')
    word2: ElementRef | undefined;
  @ViewChild('w3')
    word3: ElementRef | undefined;
  @ViewChild('w4')
    word4: ElementRef | undefined;
  @ViewChild('w5')
    word5: ElementRef | undefined;

  captcha: { question: string; answer: number };
  userValue = '';
  completed = false;
  failed = false;
  refreshIcon = faArrowRotateRight;
  forward = faForward;
  backward = faBackward;
  level = 'level1';
  words: string[] = [];
  canSkip = false;
  currentLevel = 1;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private renderer: Renderer2,
    private mathService: MathService,
    private stateService: StateService,
  ) {
    this.captcha = this.mathService.generateCaptcha();
    this.words = this.captcha.question.split(' ');
    this.canSkip = this.stateService.getHighestCompleted() >= this.currentLevel;
  }

  ngAfterViewInit(): void {
    this.setClasses();
  }

  setClasses(): void {
    if (this.word1 && this.word2 && this.word3 && this.word4 && this.word5) {
      this.renderer.addClass(this.word1.nativeElement, this.randomClass());
      this.renderer.addClass(this.word2.nativeElement, this.randomClass());
      this.renderer.addClass(this.word3.nativeElement, this.randomClass());
      this.renderer.addClass(this.word4.nativeElement, this.randomClass());
      this.renderer.addClass(this.word5.nativeElement, this.randomClass());
    }
  }

  removeClasses(): void {
    if (this.word1 && this.word2 && this.word3 && this.word4 && this.word5) {
      this.renderer.removeClass(this.word1.nativeElement, this.randomClass());
      this.renderer.removeClass(this.word2.nativeElement, this.randomClass());
      this.renderer.removeClass(this.word3.nativeElement, this.randomClass());
      this.renderer.removeClass(this.word4.nativeElement, this.randomClass());
      this.renderer.removeClass(this.word5.nativeElement, this.randomClass());
    }
  }

  randomClass(): string {
    const classes = ['w1', 'w2', 'w3'];
    const index = Math.round(Math.random() * classes.length);
    return classes[index];
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (parseInt(this.userValue, 10) === this.captcha.answer) {
      this.completed = true;
      this.stateService.updateCurrentLevelSuccess(this.level);
      this.showSuccess();
    } else {
      this.failed = true;
      this.stateService.updateCurrentLevelFail(this.level);
      this.showFail();
    }
  }

  showSuccess(): void {
    this.messageService.add({
      key: 'tr',
      severity: 'success',
      summary: 'Congrats!',
      detail: 'You cleared the captcha!',
      styleClass: 'success',
    });
  }

  showFail(): void {
    this.messageService.add({
      key: 'tr',
      severity: 'error',
      summary: 'Oops!',
      detail: 'You failed, try again.',
      styleClass: 'fail',
    });
  }

  refreshCaptcha(event: MouseEvent): void {
    event.preventDefault();
    this.captcha = this.mathService.generateCaptcha();
    this.words = this.captcha.question.split(' ');
    this.userValue = '';
    this.failed = false;
    this.completed = false;
    this.removeClasses();
    this.setClasses();
    this.input?.nativeElement.focus();
  }

  move(event: MouseEvent, level: string): void {
    event.preventDefault();
    this.router.navigate([level]);
  }
}
