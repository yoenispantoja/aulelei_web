import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTrabajadoresComponent } from './lista-trabajadores/lista-trabajadores.component';
import { AdicionarTrabajadoresComponent } from './adicionar-trabajadores/adicionar-trabajadores.component';
import { EditarTrabajadorComponent } from './editar-trabajador/editar-trabajador.component';
import { TrabajadoresRoutingModule } from './trabajadores-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    PageHeaderModule,
    TrabajadoresRoutingModule,
    SharedModule.forRoot(),
    DropDownListModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn',
    }),
    FormsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot(),
    NgbModule,
  ],
  declarations: [
    ListaTrabajadoresComponent,
    AdicionarTrabajadoresComponent,
    EditarTrabajadorComponent,
  ],
})
export class TrabajadoresModule {}
