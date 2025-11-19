import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
// import { TranslateService } from '@ngx-translate/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
// import { locale } from '../../app/navigation/i18n/ar';
import { HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
// import { ar } from 'date-fns/locale';
import { registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import en from '@angular/common/locales/en';
import { TranslocoService } from '@jsverse/transloco';
import { AG_GRID_LOCALE_AR } from '../utils/ag-grid-locale.ar';
import { AG_GRID_LOCALE_EN } from '../utils/ag-grid-locale.en';

@Injectable({
  providedIn: 'root',
})
export class OverrideService {
  private translate = inject(TranslocoService);
  private titleService = inject(Title);
  private router = inject(Router);

  language: Observable<string> = of(localStorage.getItem('language') ?? 'en');
  userTypeO: Observable<string> = of(
    (() => {
      const encodedUserType = localStorage.getItem(btoa('userType'));
      return encodedUserType !== null ? atob(encodedUserType) : 'admin';
    })()
  );
  userType$: BehaviorSubject<string> = new BehaviorSubject('');
  login$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  FuseConfig$: BehaviorSubject<string> = new BehaviorSubject('modern');
  isAuthenticated = false;
  private token: string | null = null;
  constructor() {}

  agGridLocale: {
    [key: string]: string;
  } =
    this.translate.getActiveLang() === 'ar'
      ? AG_GRID_LOCALE_AR
      : AG_GRID_LOCALE_EN;
  getAuthStatus() {
    return this.login$.asObservable();
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  //   public imageUrl = API_URLS.File.download;

  public violationImageUrl(ip: string, path: string): string {
    return `http://${ip}:3305/File/view?imgpath=${path}`;
  }

  autoAuthUser() {
    const authInformation = this.getToken();
    const userTypeInformation = this.userType;

    if (authInformation == null && userTypeInformation == 'ée') {
      console.log('auth', authInformation, userTypeInformation);
      this.router.navigate(['/pages/auth/login']);
      return;
    }
    this.token = authInformation;
    this.isAuthenticated = true;
    this.login$.next(true);
    this.userType$.next(userTypeInformation);
  }

  logOut() {
    localStorage.clear();
    localStorage.clear();
    this.isAuthenticated = false;
    this.login$.next(false);
    this.userType$.next('');
  }
  getUserTypeAsObservable() {
    return this.userType$.asObservable();
  }
  public get userType(): string {
    const encodedKey = btoa('userType');
    const storedValue = localStorage.getItem(encodedKey);
    return storedValue !== null ? atob(storedValue) : '';
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Languages
  get currentLang() {
    return this.translate.getActiveLang();
  }
  get lang(): Observable<string> {
    return this.language;
  }

  get otherLang() {
    switch (localStorage.getItem('language')) {
      case 'en':
        return 'ar';
      case 'ar':
        return 'en';
      default:
        return 'ar';
    }
  }

  switchLanguage(language: string, key?: string) {
    //   if (this.currentLang == language) {
    this.translate.setActiveLang(language);
    this.language = of(language);
    registerLocaleData(language === 'en' ? en : ar);

    localStorage.setItem('language', language ?? 'en');
    this.setTitle();
    this.setStyle();
  }
  // inverseLang(keyLang) {
  //   return keyLang === 'en' ? 'ar' : 'en';
  // }
  // // Title
  setTitle() {
    return this.translate.langChanges$.subscribe((data) => {
      this.titleService.setTitle(
        this.translate.translate('Radar Management System')
      );
    });
  }

  // // Style
  setStyle() {
    const keyLang =
      localStorage.getItem('language') ||
      this.currentLang ||
      this.translate.getDefaultLang();

    // this.fuseConfigService.config = {
    //   layout: localStorage.getItem('Layout'),
    //   color: 'indigo',
    //   direction: keyLang === 'ar' ? 'rtl' : 'ltr'
    // }
    // const keyLang = localStorage.getItem('language') || this.currentLang || this.translate.getDefaultLang();
    const htmlElement = document.getElementsByTagName('html')[0];
    const headElements = document.getElementsByTagName('head')[0];

    htmlElement.setAttribute('lang', keyLang);
    if (keyLang === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
    }
  }

  public get AuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      authorization:
        'Bearer ' +
        'Y29tLm92ZXJyaWRlZWcubW9kZXJuLWFjYWRlbXkuY29tcHV0ZXIuZGVsZWdhdGlvbg=',
    });
  }
  public get LoginHeaders(): HttpHeaders {
    return new HttpHeaders({
      authorization:
        'Bearer ' +
        'Y29tLm92ZXJyaWRlZWcubW9kZXJuLWFjYWRlbXkuY29tcHV0ZXIuZGVsZWdhdGlvbg=',
    });
  }

  public get FilesAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      authorization:
        'Bearer ' +
        'Y29tLm92ZXJyaWRlZWcubW9kZXJuLWFjYWRlbXkuY29tcHV0ZXIuZGVsZWdhdGlvbg=',
    });
  }
  public get enableRtl(): Observable<boolean> {
    return of(this.translate.isLang('ar'));
  }

  public get isRTL(): boolean {
    let rtl = false;
    this.translate.langChanges$.subscribe((lang) => {
      lang == 'ar' ? (rtl = true) : (rtl = false);
    });
    return rtl;
  }

  public get dir(): 'rtl' | 'ltr' {
    return this.isRTL ? 'rtl' : 'ltr';
  }
}

export function camelize(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
