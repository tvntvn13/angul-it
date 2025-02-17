import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  private helper: Helper;
  private captcha: { question: string; answer: number };

  constructor() {
    this.helper = new Helper();
    this.captcha = this.helper.generateCaptcha();
  }

  getCaptcha(): { question: string; answer: number } {
    return this.captcha;
  }

  generateCaptcha(): { question: string; answer: number } {
    this.captcha = this.helper.generateCaptcha();
    return this.captcha;
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

  randomChance(): boolean {
    return Math.random() > 0.5;
  }

  private CHAR_REPLACEMENTS: { [key: string]: string } = {
    'o': '0',
    'i': '1',
    'e': '3'
  };
  randomizeString(wordString: string): string {
    return wordString.split('').map(char => {
      const replacement = this.CHAR_REPLACEMENTS[char];
      if (replacement && this.randomChance()) {
        return replacement;
      }
      return this.randomChance() ? char.toUpperCase() : char;
    }).join('');
  }

  generateCaptcha(): { question: string; answer: number } {
    const num1 = Math.ceil(Math.random() * 10);
    const num2 = Math.ceil(Math.random() * 10);
    const num3 = Math.ceil(Math.random() * 10);

    const ops1 = this.operators[Math.round(Math.random() * 1)];
    const plus = ops1 === 'plus';
    const ops2 = plus ? this.operators[0] : this.operators[1];

    const answer = plus ? num1 + num2 - num3 : num1 - num2 + num3;
    const question = `${this.numbers.get(num1)} ${ops1} ${this.numbers.get(
      num2,
    )
      } ${ops2} ${this.numbers.get(num3)}`;

    return { question: this.randomizeString(question), answer: answer };
  }
}
