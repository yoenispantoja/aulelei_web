import { NgModule } from '@angular/core';
import { WebRoutingModule } from './web-routing.module';
import { IndexComponent } from './index/index.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap'; // para los componentes de bootstrap
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxSocialButtonModule } from 'ngx-social-button'; // Para la autenticación con redes sociales

import { BlogComponent } from './blog/blog.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { ComunesModule } from './comunes/comunes.module';
import { GaleriaComponent } from './galeria/galeria.component';
import { EventoComponent } from './evento/evento.component';
import { ReservarComponent } from './reservar/reservar.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginClienteComponent } from './login-cliente/login-cliente.component';
import { RegisterClienteComponent } from './register-cliente/register-cliente.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import {
  TimePickerModule,
  DatePickerModule,
} from '@syncfusion/ej2-angular-calendars';
import { DetalleServiciosComponent } from './detalle-servicios/detalle-servicios.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    WebRoutingModule,
    CarouselModule,
    NgxPageScrollModule,
    SharedModule.forRoot(),
    ComunesModule,
    ArchwizardModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSocialButtonModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-danger',
      cancelButtonClass: 'btn',
    }),
    ScheduleModule,
    TimePickerModule,
    DatePickerModule,
    SharedModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    BlogComponent,
    GaleriaComponent,
    EventoComponent,
    ReservarComponent,
    LoginClienteComponent,
    RegisterClienteComponent,
    DetalleServiciosComponent,
    TiendaComponent
  ],
  entryComponents: [LoginClienteComponent, RegisterClienteComponent, DetalleServiciosComponent],
})
export class WebModule {}
