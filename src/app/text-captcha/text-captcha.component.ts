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
import { TextService } from '../service/text.service';

@Component({
  selector: 'app-text-captcha',
  templateUrl: './text-captcha.component.html',
  styleUrls: ['./text-captcha.component.css'],
})
export class TextCaptchaComponent implements AfterViewInit {
  @ViewChild('container')
    container: ElementRef | undefined;
  completed = false;
  userValue = '';
  captcha: { code: string; imageData: string };
  congratsMessage = 'TEMP';
  congratsOpacity = 0;
  failed = false;
  refreshIcon = faArrowRotateRight;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private renderer: Renderer2,
    private textService: TextService,
  ) {
    this.captcha = this.textService.generateCaptcha();
  }

  ngAfterViewInit(): void {
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'animate-in');
    }

    setTimeout(() => {
      this.renderer.removeClass(this.container?.nativeElement, 'animate-in');
    }, 500);
  }

  onsubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (this.userValue.toLowerCase() === this.captcha.code.toLowerCase()) {
      this.congratsMessage = 'CONGRATS!';
      this.congratsOpacity = 1;
      this.completed = true;
      this.userValue = '';
      this.showSuccess();
    } else {
      this.congratsMessage = 'WRONG!';
      this.userValue = '';
      this.congratsOpacity = 1;
      this.failed = true;
      this.showFail();
    }
  }

  refreshCaptcha(event: MouseEvent): void {
    event.preventDefault();
    this.captcha = this.textService.generateCaptcha();
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

  move() {
    this.router.navigate(['level3']);
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
}
