import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro.component';
import { RegistroRoutingModule } from './registro-routing.module';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgxSocialButtonModule } from 'ngx-social-button';

@NgModule({
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-danger',
      cancelButtonClass: 'btn'
    }),
    NgxSocialButtonModule
  ],
  declarations: [RegistroComponent]
})
export class RegistroModule { }
