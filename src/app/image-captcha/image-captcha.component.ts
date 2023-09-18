import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../service/image.service';
import {
  faArrowRotateRight,
  faBackward,
  faForward,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { StateService } from '../service/state.service';

@Component({
  selector: 'app-image-captcha',
  templateUrl: './image-captcha.component.html',
  styleUrls: ['./image-captcha.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCaptchaComponent implements AfterViewInit {
  @ViewChild('gridElement')
    gridElement: ElementRef | undefined;
  @ViewChild('gridButton')
    gridButton: ElementRef | undefined;

  level = 'level3';
  answerArray: boolean[][];
  correctAnswerArray: boolean[][];
  captcha: { imageUrl: string; key: boolean[][] };
  completed = false;
  failed = false;
  currentImage: string;
  gridLength: number = 5;
  refreshIcon = faArrowRotateRight;
  bgUrl: string;
  warningUrl = 'url("assets/images/warning.png")';
  backward = faBackward;
  forward = faForward;
  canSkip = false;
  currentLevel = 3;

  constructor(
    private router: Router,
    private imageService: ImageService,
    private messageService: MessageService,
    private renderer: Renderer2,
    private stateService: StateService,
  ) {
    this.captcha = this.imageService.getCaptcha();
    this.correctAnswerArray = this.captcha.key;
    this.currentImage = this.captcha.imageUrl;
    this.answerArray = this.imageService.initEmptyArray(this.gridLength);
    this.bgUrl = `url(${this.currentImage})`;
    this.canSkip = this.stateService.getHighestCompleted() >= this.currentLevel;
  }

  ngAfterViewInit(): void {
    if (this.gridElement) {
      const grid = this.gridElement.nativeElement;
      this.renderer.setStyle(grid, 'backgroundImage', this.bgUrl);
    }
    this.refreshCaptcha();
  }

  cellClicked(
    rowIndex: number,
    colIndex: number,
    button: HTMLButtonElement | null,
  ): void {
    this.answerArray[colIndex][rowIndex] = !this
      .answerArray[colIndex][rowIndex];

    this.answerArray[colIndex][rowIndex]
      ? button?.classList.add('selected')
      : button?.classList.remove('selected');
  }

  validateCaptcha(): void {
    const isAnswerValid = this.imageService.checkArraysEqual(
      this.answerArray,
      this.correctAnswerArray,
    );

    if (isAnswerValid) {
      this.stateService.updateCurrentLevelSuccess(this.level);
      this.success();
    } else {
      this.stateService.updateCurrentLevelFail(this.level);
      this.fail();
    }
  }

  refreshCaptcha(): void {
    this.captcha = this.imageService.generateCaptcha(this.currentImage);
    this.answerArray = this.imageService.initEmptyArray(this.gridLength);
    this.correctAnswerArray = this.captcha.key;
    this.completed = false;
    this.failed = false;
    if (this.gridElement) {
      this.bgUrl = `url(${this.captcha.imageUrl})`;
      this.renderer.setStyle(
        this.gridElement.nativeElement,
        'backgroundImage',
        this.bgUrl,
      );
    }
    this.clearButtons();
    this.renderer.setStyle(
      this.gridButton?.nativeElement,
      'borderColor',
      '#2d28285a',
    );
  }

  move(event: MouseEvent, level: string): void {
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

  clearButtons(): void {
    if (this.gridElement) {
      const grid = document.getElementById('captcha');
      const buttons = grid?.querySelectorAll('button');
      buttons?.forEach((button) => {
        button.classList.remove('selected');
      });
    }
  }

  success() {
    this.completed = true;
    this.showSuccess();
  }

  fail() {
    const gridButton = this.gridButton?.nativeElement;
    this.failed = true;
    this.clearButtons();
    this.renderer.setStyle(gridButton, 'borderColor', 'transparent');
    this.showFail();
  }
}
