import { Injectable } from '@angular/core';
import { LevelResult } from '../interface/level-result';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly LOCAL_STORAGE_KEY = 'captcha';
  private _state: Map<string, LevelResult>;

  constructor() {
    this._state = this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): Map<string, LevelResult> {
    const localStorageData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (localStorageData) {
      try {
        const data = JSON.parse(atob(localStorageData));
        // const data = JSON.parse(localStorageData);
        return new Map(Object.entries(data));
      } catch (e) {
        console.log('error parsing JSON: ', e);
        this._state = new Map<string, LevelResult>();
        return new Map<string, LevelResult>();
      }
    }
    this._state = new Map<string, LevelResult>();
    return new Map<string, LevelResult>();
  }

  getState(): Map<string, LevelResult> {
    return this._state;
  }

  setState(data: Map<string, LevelResult>): void {
    this._state = data;
    const encodedData = btoa(JSON.stringify(Object.fromEntries(data)));
    // const encodedData = JSON.stringify(Object.fromEntries(data));
    localStorage.setItem(this.LOCAL_STORAGE_KEY, encodedData);
  }

  getHighestCompleted(): number {
    let highestCompleted = 0;
    for (const [level, result] of this._state) {
      if (level && result.highestLevel > highestCompleted) {
        highestCompleted = result.highestLevel;
      }
    }
    return highestCompleted;
  }

  resetState(): void {
    this.setState(new Map<string, LevelResult>());
  }

  initCurrentLevel(): void {
    if (this._state.get('level1')) return;
    const newEntry = {
      tries: 0,
      completed: false,
      highestLevel: 0,
      percentage: '0%',
    };
    this._state.set('level1', newEntry);
    this.setState(this._state);
  }

  calculatePercentage(level: string): string {
    const tries = this.getState().get(level)!.tries;
    const result = Math.round(1 / tries * 100);
    return result.toFixed(2) + '%';
  }

  updateCurrentLevelSuccess(level: string): void {
    const levelNumber = +level.at(-1)!;
    if (!this._state.get(level)) {
      const newEntry = {
        tries: 1,
        completed: true,
        highestLevel: levelNumber,
      };
      this._state.set(level, newEntry);
      this.setState(this._state);
    } else {
      const update = this._state.get(level)!;
      update.tries += 1;
      update.completed = true;
      update.highestLevel = levelNumber;
      this._state.set(level, update);
      this.setState(this._state);
    }
  }

  updateCurrentLevelFail(level: string): void {
    if (!this._state.get(level)) {
      const newEntry = {
        tries: 1,
        completed: false,
        highestLevel: 0,
      };
      this._state.set(level, newEntry);
      this.setState(this._state);
    } else {
      const update = this._state.get(level)!;
      update.tries += 1;
      this._state.set(level, update);
      this.setState(this._state);
    }
  }
}
