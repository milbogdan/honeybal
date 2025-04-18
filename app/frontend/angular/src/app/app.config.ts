import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import Aura from '@primeng/themes/aura';
import { CacheInterceptor } from './interceptors/http-cache.interceptor';
import { httpRequestInterceptor } from './interceptors/http.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([
      httpRequestInterceptor,
      CacheInterceptor
    ])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
