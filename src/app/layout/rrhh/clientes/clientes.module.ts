import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { PageHeaderModule, SharedModule } from 'src/app/shared';
import { DymTableModule } from 'src/app/shared/modules/dym-table/dym-table.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    PageHeaderModule,
    DymTableModule,
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
  declarations: [ListaClientesComponent, EditarClienteComponent]
})
export class ClientesModule { }
