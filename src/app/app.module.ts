import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap'; // para los componentes de bootstrap
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SocialServiceConfig } from 'ngx-social-button'; // Para la autenticación con redes sociales
import { LightboxModule } from 'ngx-lightbox';

// Todo para el SideBar
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/utils/token-interceptor';
import { HttpErrorInterceptor } from './shared/utils/http-error.interceptor';
import { NgpInterceptorModule } from './shared/modules/interceptor-module/interceptor.module';
import { GlobalErrorHandler } from './shared/utils/global-error';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedModule } from './shared/modules/shared/shared.module';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

// Configuración para las claves de las redes sociales
export function getAuthServiceConfigs() {
  const config = new SocialServiceConfig()
    .addFacebook('218292062554690')
    .addGoogle(
      '15078601232-s4v0nb4bfqjdlgh5c42gpdj5ikq4cvad.apps.googleusercontent.com'
    );
  return config;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    LightboxModule,
    NgpInterceptorModule.forRoot(),
    ToastrModule.forRoot(),
    SharedModule.forRoot(),
    ScheduleModule,
  ],
  declarations: [AppComponent],
  providers: [
    AuthGuard,
    {
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
