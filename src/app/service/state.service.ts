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
        return new Map(Object.entries(data));
      } catch (e) {
        console.log('error parsing JSON: ', e);
        return new Map<string, LevelResult>();
      }
    }
    return new Map<string, LevelResult>();
  }

  getState(): Map<string, LevelResult> {
    return this._state;
  }

  setState(data: Map<string, LevelResult>): void {
    this._state = data;
    const encodedData = btoa(JSON.stringify(Object.fromEntries(data)));
    localStorage.setItem(this.LOCAL_STORAGE_KEY, encodedData);
  }

  resetState(): void {
    this.setState(new Map<string, LevelResult>());
  }
}
