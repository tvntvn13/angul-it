import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  // Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowRotateRight,
  faBackward,
  faForward,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { TextService } from '../service/text.service';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-text-captcha',
  templateUrl: './text-captcha.component.html',
  styleUrls: ['./text-captcha.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextCaptchaComponent {
  @ViewChild('container')
    container: ElementRef | undefined;
  @ViewChild('inputField')
    input: ElementRef | undefined;

  level = 'level2';
  completed = false;
  userValue = '';
  captcha: { code: string; imageData: string };
  congratsOpacity = 0;
  failed = false;
  refreshIcon = faArrowRotateRight;
  backward = faBackward;
  forward = faForward;
  canSkip = false;
  currentLevel = 2;

  constructor(
    private router: Router,
    private messageService: MessageService,
    // private renderer: Renderer2,
    private textService: TextService,
    private stateService: StateService,
  ) {
    this.router = router;
    this.messageService = messageService;
    this.textService = textService;
    this.stateService = stateService;
    this.captcha = this.textService.generateCaptcha();
    this.canSkip = this.stateService.getHighestCompleted() >= this.currentLevel;
  }


  onsubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (this.userValue.toLowerCase() === this.captcha.code.toLowerCase()) {
      this.completed = true;
      this.userValue = '';
      this.stateService.updateCurrentLevelSuccess(this.level);
      this.showSuccess();
    } else {
      this.userValue = '';
      this.failed = true;
      this.stateService.updateCurrentLevelFail(this.level);
      this.showFail();
    }
  }

  refreshCaptcha(event: MouseEvent): void {
    event.preventDefault();
    this.captcha = this.textService.generateCaptcha();
    this.userValue = '';
    this.failed = false;
    this.completed = false;
    this.input?.nativeElement.focus();
  }

  move(event: MouseEvent, level: string) {
    event.preventDefault();
    this.router.navigate([level]);
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
