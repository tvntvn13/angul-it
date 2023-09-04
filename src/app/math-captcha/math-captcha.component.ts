import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-math-captcha',
  templateUrl: './math-captcha.component.html',
  styleUrls: ['./math-captcha.component.css'],
})
export class MathCaptchaComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.helper = new Helper();
    this.captcha = this.helper.generateCaptcha();
  }

  helper: any;
  captcha: any;
  userValue = '';
  congratsOpacity = 0;
  congratsMessage = '';
  completed = false;
  failed = false;

  onSubmit(): void {
    if (parseInt(this.userValue, 10) === this.captcha.answer) {
      this.congratsMessage = 'CONGRATS!';
      this.congratsOpacity = 1;
      this.completed = true;
    } else {
      this.failed = true;
      this.congratsMessage = 'WRONG!';
      this.congratsOpacity = 1;
    }
  }

  refreshCaptcha(): void {
    this.captcha = this.helper.generateCaptcha();
    this.userValue = '';
    this.congratsOpacity = 0;
    this.failed = false;
    this.completed = false;
  }

  goToNext(): void {
    console.log('cheeerss...');
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
