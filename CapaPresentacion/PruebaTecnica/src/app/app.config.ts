import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { Api } from './Servicios/Api.service';
import { AuthInterceptorService } from './Interceptor/AuthInterceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {ScreenTrackingService, UserTrackingService}
from '@angular/fire/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    },
    Api, 
    provideAnimationsAsync(),
    ScreenTrackingService,
    UserTrackingService
  ]
};
