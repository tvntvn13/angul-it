import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  private userProgress = new Map<string, boolean>([
    ['level1', false],
    ['level2', false],
    ['level3', false],
  ]);

  setLevelCompleted(level: string) {
    this.userProgress.set(level, true);
  }

  isLevelCompleted(level: string) {
    return this.userProgress.get(level);
  }
}
