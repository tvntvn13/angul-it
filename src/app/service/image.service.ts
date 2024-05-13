import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageUrls: string[];

  private currentImageUrl: string | null = null;

  private keys: boolean[][] = [];

  private length = 0;

  private captcha: { imageUrl: string, key: boolean[][] };

  private key: boolean[][] = [];

  getCaptcha(): { imageUrl: string, key: boolean[][] } {
    return this.captcha;
  }

  constructor() {

    this.keys = [[false, true, true, true, true, false, true, true, true, true, false,
      true, true, true, true, false, false, true, true, true, false, false, false, false, false],
    [false, true, true, false, false, true, true, true, true, false, true, true, true, true,
      false, true, true, true, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, true, true, true, false, false,
      true, true, true, false, false, true, true, true, false, false, false, true, false],
    [true, true, true, true, false, true, true, true, true, false, true, true, true,
      true, false, false, true, true, false, false, false, true, true, true, false],
    [false, false, false, false, false, false, false, false, true, true, false, false,
      true, true, true, false, false, true, true, true, false, false, false, true, true],
    [false, false, false, true, true, false, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, false, true, true, true, true],
    [false, false, false, false, false, false, false, true, true, true, false,
      false, true, true, true, false, false, true, true, true, false, false, true, true, true],
    [false, false, false, true, true, false, false, true, true, true, false, false, true, true,
      true, false, false, true, true, true, false, false, false, true, true],
    [false, false, true, true, true, false, true, true, true, true, false, true,
      true, true, true, true, true, true, true, true, true, true, true, true, true],
    [false, false, false, false, false, false, true, true, true, true, false, true,
      true, true, true, false, false, true, true, true, false, false, false, false, false],
    ];

    this.imageUrls = [
      'assets/images/1.jpg',
      'assets/images/2.jpg',
      'assets/images/3.jpg',
      'assets/images/4.jpg',
      'assets/images/5.jpg',
      'assets/images/6.jpg',
      'assets/images/7.jpg',
      'assets/images/8.jpg',
      'assets/images/9.jpg',
      'assets/images/10.jpg',
    ];

    this.length = this.imageUrls.length - 1;

    this.captcha = this.generateCaptcha(this.currentImageUrl);
  }

  generateCaptcha(currentImgUrl: string | null): { imageUrl: string, key: boolean[][] } {
    const index: number = Math.round(Math.random() * this.length);

    if (currentImgUrl === null || this.currentImageUrl != this.imageUrls[index]) {
      this.currentImageUrl = this.imageUrls[index];
      this.key = this.convertKeyTo2d(this.keys[index]);
      return { imageUrl: this.currentImageUrl, key: this.key };
    } else {
      return this.generateCaptcha(this.currentImageUrl);
    }
  }

  convertKeyTo2d(key: boolean[]): boolean[][] {
    const key2D: boolean[][] = [];
    for (let i = 0; i < 5; i++) {
      const row: boolean[] = [];
      for (let j = 0; j < 5; j++) {
        const index = i * 5 + j;
        row.push(key[index]);
      }
      key2D.push(row);
    }
    return key2D;
  }

  initEmptyArray(rowLength: number): boolean[][] {
    const emptyKey2D: boolean[][] = [];
    for (let i = 0; i < rowLength; i++) {
      const row = new Array(rowLength).fill(false);
      emptyKey2D.push(row);
    }
    return emptyKey2D;
  }

  checkArraysEqual(arr1: boolean[][], arr2: boolean[][]): boolean {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }
}
