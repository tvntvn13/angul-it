import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from '../service/image.service';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-captcha',
  templateUrl: './image-captcha.component.html',
  styleUrls: ['./image-captcha.component.css'],
})
export class ImageCaptchaComponent implements AfterViewInit {
  @ViewChild('gridElement')
    gridElement: ElementRef | undefined;

  constructor(
    private router: Router,
    private imageService: ImageService,
  ) {
    this.captcha = this.imageService.getCaptcha();
    this.correctAnswerArray = this.captcha.key;
    this.currentImage = this.captcha.imageUrl;
    this.answerArray = this.imageService.initEmptyArray(this.gridLength);
  }
  ngAfterViewInit(): void {
    this.refreshCaptcha();
    if (this.gridElement) {
      const grid = this.gridElement.nativeElement;
      grid.style.backgroundImage = `url(${this.captcha.imageUrl}`;
    }
  }

  answerArray: boolean[][];
  correctAnswerArray: boolean[][];
  captcha: { imageUrl: string; key: boolean[][] };
  completed = false;
  failed = false;
  congratsMessage: string = 'TEMP';
  congratsOpacity: 1 | 0 = 0;
  currentImage: string;
  gridLength: number = 5;
  refreshIcon = faArrowRotateRight;

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
    // console.log('clicked: col: ', colIndex, ' row: ', rowIndex);
  }

  validateCaptcha(): void {
    const isAnswerValid = this.imageService.checkArraysEqual(
      this.answerArray,
      this.correctAnswerArray,
    );

    isAnswerValid ? this.success() : this.fail();
  }

  refreshCaptcha(): void {
    const gridElement = document.getElementById('captcha');
    const buttons = gridElement?.querySelectorAll('button');

    this.captcha = this.imageService.generateCaptcha(this.currentImage);
    this.answerArray = this.imageService.initEmptyArray(this.gridLength);
    this.correctAnswerArray = this.captcha.key;
    this.completed = false;
    this.failed = false;
    this.congratsMessage = 'TEMP';
    this.congratsOpacity = 0;
    if (gridElement != null) {
      gridElement.style.backgroundImage = `url(${this.captcha.imageUrl})`;
      buttons?.forEach((button) => {
        button.classList.remove('selected');
      });
    }
  }

  goToNext(): void {
    this.refreshCaptcha();
    this.router.navigate(['results']);
  }

  success() {
    this.completed = true;
    this.congratsMessage = 'CONGRATS!';
    this.congratsOpacity = 1;
  }

  fail() {
    this.failed = true;
    this.congratsMessage = 'Wrong answer, try again';
    this.congratsOpacity = 1;
  }
}
