import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from "./../../../shared";
import { ReactiveFormsModule, FormsModule } from "@angular/forms"; //para los formularios
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2"; //para los sweetAlerts

import { DymTableModule } from 'src/app/shared/modules/dym-table/dym-table.module';

import { MediasRoutingModule } from './medias-routing.module';
import { ListaMediasComponent } from './lista-medias/lista-medias.component';
import { AdicionarMediasComponent } from './adicionar-medias/adicionar-medias.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImagePreview } from 'src/app/shared/directives/media-preview.directive';


@NgModule({
  declarations: [ListaMediasComponent, AdicionarMediasComponent, ImagePreview],
  imports: [
    CommonModule,
    MediasRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule, FormsModule,
    SweetAlert2Module,
    DymTableModule,
    FileUploadModule
  ]
})
export class MediasModule { }
