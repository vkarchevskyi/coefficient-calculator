import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  protected readonly darkModeClass: string = 'dark-mode';
  protected readonly modeLocalStorageKey: string = 'isDarkMode';
  protected _isDarkTheme: boolean;

  constructor() {
    this._isDarkTheme =
      localStorage.getItem(this.modeLocalStorageKey) === 'true';
    this.setTheme(this._isDarkTheme);
  }

  public toggleTheme(): void {
    this.setTheme(!this._isDarkTheme);
  }

  public get isDarkTheme(): boolean {
    return this._isDarkTheme;
  }

  protected setTheme(isDarkTheme: boolean): void {
    if (isDarkTheme) {
      document.body.classList.add(this.darkModeClass);
    } else {
      document.body.classList.remove(this.darkModeClass);
    }

    localStorage.setItem(this.modeLocalStorageKey, String(isDarkTheme));
    this._isDarkTheme = isDarkTheme;
  }
}
