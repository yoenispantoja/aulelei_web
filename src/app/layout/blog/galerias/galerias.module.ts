import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../../shared';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { EditorModule } from '@tinymce/tinymce-angular'; // para el ckeditor
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { DymTableModule } from '../../../shared/modules/dym-table/dym-table.module';

import { GaleriasRoutingModule } from './galerias-routing.module';

import { ListaGaleriasComponent } from './lista-galerias/lista-galerias.component';
import { AdicionarGaleriasComponent } from './adicionar-galerias/adicionar-galerias.component';
import { EditarGaleriasComponent } from './editar-galeria/editar-galeria.component';
import { VerGaleriaComponent } from './ver-galeria/ver-galeria.component';

@NgModule({
  declarations: [ListaGaleriasComponent, AdicionarGaleriasComponent, EditarGaleriasComponent, VerGaleriaComponent],
  imports: [
    CommonModule,
    GaleriasRoutingModule,
    PageHeaderModule,
    EditorModule,
    DymTableModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
  ],
  entryComponents: [VerGaleriaComponent]
})
export class GaleriasModule {}

