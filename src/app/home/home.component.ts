import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<div class="container">
  <pre>
    <p id="home-paragraph">
Hey, and welcome.

To verify you are a human,
start the tests.
    </p>
  </pre>
  <button id="start-button" (click)="goToCaptchas()">START</button>
</div>`,
  styles: [
    `.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;}
#home-paragraph {
  text-align: justify;
  font-size:1.5rem;
  color: #b9c2f8;}
#start-button {
  display: flex;
  width: 15%;
  padding: 1rem;
  height: 2rem;
  color: #00d0a3;
  background-color: #1e343f;
  border-radius: 10px;
  border: solid 1px #00ffae;
  justify-content: center;
  align-items: center;}
#start-button:hover {
  transform: scale(1.2,1.2);}`,
  ],
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToCaptchas() {
    console.log('here we go..');
    this.router.navigate(['/level1']);
  }
}
