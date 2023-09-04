import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-captcha',
  templateUrl: './text-captcha.component.html',
  styleUrls: ['./text-captcha.component.css'],
})
export class TextCaptchaComponent implements OnInit {
  completed = false;
  userValue = '';
  captcha: any;
  congratsMessage = '';
  congratsOpacity = 0;
  failed = false;

  constructor(private router: Router) {
    this.captcha = new captcha({
      stringLength: 6,
      lineNoise: 25,
      dotNoise: 150,
    }).draw();
  }

  ngOnInit(): void {
    this.captcha = new captcha({
      stringLength: 6,
      lineNoise: 25,
      dotNoise: 150,
    }).draw();
  }

  onsubmit(): void {
    if (this.userValue.toLowerCase() === this.captcha.code.toLowerCase()) {
      this.congratsMessage = 'CONGRATS!';
      this.congratsOpacity = 1;
      this.completed = true;
      this.userValue = '';
    } else {
      this.congratsMessage = 'WRONG!';
      this.userValue = '';
      this.congratsOpacity = 1;
      this.completed = false;
      this.failed = true;
    }
  }

  refreshCaptcha(): void {
    this.captcha = new captcha({
      stringLength: 6,
      lineNoise: 25,
      dotNoise: 150,
    }).draw();
    this.userValue = '';
    this.congratsOpacity = 0;
    this.failed = false;
    this.completed = false;
  }

  goToNext(): void {
    this.router.navigate(['level3']);
  }
}

class captcha {
  options = {
    stringLength: 6,
    lineNoise: 25,
    dotNoise: 150,
  };

  constructor(options: any) {
    this.options.stringLength = options.stringLength;
    this.options.lineNoise = options.lineNoise;
    this.options.dotNoise = options.dotNoise;
  }

  draw() {
    const canvasCreator = new helper(this.options);
    canvasCreator.prepareCanvas();
    canvasCreator.lineNoiseGenerator();
    canvasCreator.dotNoiseGenerator();
    const dataImage = canvasCreator.convertCanvasToImage();
    const code = canvasCreator.captcha;
    return { code: code, imageData: dataImage };
  }
}

class helper {
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  hexColor = '0123456789abcdef';
  captcha: any;
  canvas = document.createElement('canvas');
  context = this.canvas?.getContext('2d');
  options = {
    stringLength: 6,
    lineNoise: 25,
    dotNoise: 150,
  };

  constructor(options: any) {
    this.options.stringLength = options.stringLength;
    this.options.lineNoise = options.lineNoise;
    this.options.dotNoise = options.dotNoise;
  }

  generateStringForCaptcha(length = 6) {
    let index = null;
    let captchaString = '';
    for (let i = 0; i < length; i++) {
      index = Math.floor(Math.random() * (this.letters.length - 1));
      captchaString += this.letters.charAt(index);
    }
    return captchaString;
  }

  colorGenerator() {
    let index = null;
    let color = '#';
    for (let i = 0; i < 6; i++) {
      index = Math.floor(Math.random() * (this.hexColor.length - 1));
      color += this.hexColor.charAt(index);
    }

    return color;
  }

  lineNoiseGenerator(length = 25) {
    if (this.context === null) return;
    for (let i = 0; i < length; i++) {
      this.context.beginPath();
      this.context.moveTo(
        this.canvas.width * Math.random(),
        this.canvas.height * Math.random(),
      );
      this.context?.lineTo(
        this.canvas.width * Math.random(),
        this.canvas.height * Math.random(),
      );
      this.context.strokeStyle = this.colorGenerator();
      this.context.lineWidth = 2;
      this.context.stroke();
    }
  }

  dotNoiseGenerator(length = 150) {
    if (this.context === null) return;
    for (let i = 0; i < length; i++) {
      this.context.fillStyle = this.colorGenerator();
      this.context?.fillRect(
        this.canvas.width * Math.random(),
        this.canvas.height * Math.random(),
        5,
        5,
      );
    }
  }

  convertCanvasToImage() {
    const base64StringImage = this.canvas.toDataURL();
    return base64StringImage;
  }

  prepareCanvas() {
    if (this.context == null) return;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.canvas.style.border = "1px solid black";
    // this.canvas.style.width = "150px";
    // this.canvas.style.backgroundColor = this.colorGenerator();

    this.context.font = 'italic 75px Arial';
    this.context.fillStyle = this.colorGenerator();

    this.captcha = this.generateStringForCaptcha();
    this.context.fillText(this.captcha, 0, 100);
  }
}
