import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DymtablaComponent } from './dymtabla/dymtabla.component';
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2"; //para los sweetAlerts
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [DymtablaComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: "modal-content",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn"
    })
  ],
  exports: [DymtablaComponent]
})
export class DymTableModule { }
