import { inject } from '@angular/core';
import { StateService } from './state.service';
import { CanActivateFn, Router } from '@angular/router';

export function resultGuard(): CanActivateFn {
  return () => {
    const levels = new Map<number, string>([
      [0, 'home'],
      [1, 'level2'],
      [2, 'level3'],
    ]);
    const router = inject(Router);
    const stateService = inject(StateService);
    const state = stateService.getState();
    let highestCompleted = 0;
    let allLevelsDone = true;

    for (const [levelName, levelResult] of state) {
      if (!levelName || !levelResult.completed) {
        allLevelsDone = false;
      }
      if (levelResult.highestLevel > highestCompleted) {
        highestCompleted = levelResult.highestLevel;
      }
    }

    if (allLevelsDone) {
      return true;
    } else {
      router.navigate([levels.get(highestCompleted)]);
      return false;
    }
  };
}
