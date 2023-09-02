import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  // styleUrls: ['./result.component.css'],
  styles: [
    `.container {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: pink;
      flex-direction: column;
    }`,
  ],
})
export class ResultComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['home']);
  }
}
