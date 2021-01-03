import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { PageHeaderModule, SharedModule } from 'src/app/shared';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { AdicionarServicioComponent } from './adicionar-servicio/adicionar-servicio.component';


@NgModule({
  imports: [
    CommonModule,
    ServiciosRoutingModule,
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
    SharedModule.forRoot()
  ],
  declarations: [ListaServiciosComponent, EditarServicioComponent, AdicionarServicioComponent]
})
export class ServiciosModule { }
