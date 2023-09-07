import { inject } from '@angular/core';
import { StateService } from './state.service';
import { CanActivateFn, Router } from '@angular/router';

export function levelGuard(level: string): CanActivateFn {
  return () => {
    const levels = new Map<number, string>([
      [0, 'home'],
      [1, 'level2'],
      [2, 'level3'],
    ]);
    const stateService = inject(StateService);
    const router = inject(Router);
    const state = stateService.getState();
    const levelResult = state?.get(level);
    let highestCompleted = 0;

    for (const [level, levelResult] of state) {
      if (level && levelResult.highestLevel > highestCompleted) {
        highestCompleted = levelResult.highestLevel;
      }
    }

    if (levelResult && levelResult.completed) {
      return true;
    } else {
      router.navigate([levels.get(highestCompleted)]);
      return false;
    }
  };
}
