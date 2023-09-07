import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<div class="container" #homeContainer>
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
export class HomeComponent implements AfterViewInit {
  @ViewChild('homeContainer')
    container: ElementRef | undefined;
  constructor(private router: Router, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'home-in');
    }
    setTimeout(() => {
      this.renderer.removeClass(this.container?.nativeElement, 'home-in');
    }, 500);
  }

  goToCaptchas() {
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'animate-out');
      setTimeout(() => {
        this.move();
      }, 500);
    }
  }

  move(): void {
    this.router.navigate(['/level1']);
  }
}
