import { inject } from '@angular/core';
import { StateService } from './state.service';
import { CanActivateFn, Router } from '@angular/router';

export function levelGuard(level: string): CanActivateFn {
  return () => {
    const levels = new Map<number, string>([
      [0, 'level1'],
      [1, 'level2'],
      [2, 'level3'],
      [3, 'results'],
    ]);
    const stateService = inject(StateService);
    const router = inject(Router);
    const state = stateService.getState();
    let highestCompleted = 0;

    if (level === 'results') {
      for (const [levelName, levelResult] of state) {
        if (levelName == 'level3' && levelResult.completed) return true;
        if (levelResult.highestLevel > highestCompleted) {
          highestCompleted = levelResult.highestLevel;
        }
      }
      router.navigate([levels.get(highestCompleted)]);
      return false;
    } else {
      const requestedLevel = parseInt(level.at(-1) ?? '1');
      for (const [level, levelResult] of state) {
        if (level && levelResult.highestLevel > highestCompleted) {
          highestCompleted = levelResult.highestLevel;
        }
      }

      if (requestedLevel - 1 <= highestCompleted) return true;

      router.navigate([levels.get(highestCompleted)]);
      return false;
    }
  };
}
