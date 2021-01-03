
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';
import { AdicionarReservaComponent } from './adicionar-reserva/adicionar-reserva.component';
import { ReservasRoutingModule } from './reservas-routing.module';
import { PageHeaderModule, SharedModule } from 'src/app/shared';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { TimePickerModule, DatePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DropDownListModule, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  imports: [
    CommonModule,
    ReservasRoutingModule,
    PageHeaderModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot(),
    SharedModule.forRoot(),
    ScheduleModule,
    TimePickerModule,
    DatePickerModule,
    DropDownListModule,
    AutoCompleteModule,
    MaskedTextBoxModule,
    CarouselModule
  ],
  declarations: [ListaReservasComponent, EditarReservaComponent, AdicionarReservaComponent]
})
export class ReservasModule { }
