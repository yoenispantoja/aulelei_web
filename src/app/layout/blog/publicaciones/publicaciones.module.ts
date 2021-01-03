import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../../shared';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // para los formularios

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2'; // para los sweetAlerts
import { EditorModule } from '@tinymce/tinymce-angular'; // para el ckeditor
import { DymTableModule } from 'src/app/shared/modules/dym-table/dym-table.module';
import { PublicacionesRoutingModule } from './publicaciones-routing.module';

import { ListaPublicacionesComponent } from './lista-publicaciones/lista-publicaciones.component';
import { AdicionarPublicacionesComponent } from './adicionar-publicaciones/adicionar-publicaciones.component';
import { EditarPublicacionComponent } from './editar-publicacion/editar-publicacion.component';
import { VerPublicacionComponent } from './ver-publicacion/ver-publicacion.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from 'src/app/shared/utils/http-error.interceptor';
import { SharedModule } from '../../../shared/modules/shared/shared.module';

@NgModule({
  declarations: [ListaPublicacionesComponent, AdicionarPublicacionesComponent, EditarPublicacionComponent, VerPublicacionComponent],
  imports: [

  CommonModule,
    PublicacionesRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    DymTableModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    SharedModule.forRoot()
  ],
  entryComponents: [VerPublicacionComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true
    }
  ]
})
export class PublicacionesModule {}
