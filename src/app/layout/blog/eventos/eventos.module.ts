import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { AdicionarEventosComponent } from './adicionar-eventos/adicionar-eventos.component';
import { EventosRoutingModule } from '../eventos/eventos-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { DymTableModule } from 'src/app/shared/modules/dym-table/dym-table.module';
import { VerEventoComponent } from './ver-evento/ver-evento.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { SharedModule } from '../../../shared/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EventosRoutingModule,
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
  declarations: [ListaEventosComponent, AdicionarEventosComponent, EditarEventoComponent, VerEventoComponent],
  entryComponents: [VerEventoComponent]
})
export class EventosModule { }
