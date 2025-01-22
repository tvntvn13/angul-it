import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  private captcha: { code: string; imageData: string };
  private options = {
    stringLength: 6,
    lineNoise: 25,
    dotNoise: 150,
  };
  constructor() {
    this.captcha = new Captcha(this.options).draw();
  }

  getCaptcha(): { code: string; imageData: string } {
    return this.captcha;
  }

  generateCaptcha(): { code: string; imageData: string } {
    this.captcha = new Captcha(this.options).draw();
    return this.captcha;
  }
}

class Captcha {
  options = {
    stringLength: 6,
    lineNoise: 25,
    dotNoise: 150,
  };

  constructor(
    options: { stringLength: number; lineNoise: number; dotNoise: number },
  ) {
    this.options.stringLength = options.stringLength;
    this.options.lineNoise = options.lineNoise;
    this.options.dotNoise = options.dotNoise;
  }

  draw() {
    const canvasCreator = new Helper(this.options);
    canvasCreator.prepareCanvas();
    canvasCreator.lineNoiseGenerator();
    canvasCreator.dotNoiseGenerator();
    const dataImage = canvasCreator.convertCanvasToImage();
    const code = canvasCreator.captchaString;
    return { code: code, imageData: dataImage };
  }
}

class Helper {
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  hexColor = '0123456789abcdef';
  captchaString = '';
  canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');
  options = {
    stringLength: 6,
    lineNoise: 25,
    dotNoise: 150,
  };

  constructor(
    options: { stringLength: number; lineNoise: number; dotNoise: number },
  ) {
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
      this.context.lineTo(
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
      this.context.fillRect(
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

    this.context.font = 'italic 75px Arial';
    this.context.fillStyle = this.colorGenerator();

    this.captchaString = this.generateStringForCaptcha();
    this.context.fillText(this.captchaString, 0, 100);
  }
}
