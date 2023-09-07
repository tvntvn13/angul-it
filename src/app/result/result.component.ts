import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
export class ResultComponent implements AfterViewInit {
  @ViewChild('container')
    container: ElementRef | undefined;
  constructor(private router: Router, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'animate-in');
    }
    setTimeout(() => {
      this.renderer.removeClass(this.container?.nativeElement, 'animate-in');
    }, 500);
  }

  goToHome(event: MouseEvent) {
    event.preventDefault();
    if (this.container) {
      this.renderer.addClass(this.container.nativeElement, 'animate-out');
      setTimeout(() => {
        this.move();
      }, 500);
    }
  }

  move(): void {
    this.router.navigate(['home']);
  }
}
