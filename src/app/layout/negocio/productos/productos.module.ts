import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { AdicionarProductoComponent } from './adicionar-producto/adicionar-producto.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { PageHeaderModule, SharedModule } from 'src/app/shared';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    ProductosRoutingModule,
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
    NgbModule
  ],
  declarations: [ListaProductosComponent, EditarProductoComponent, AdicionarProductoComponent]
})
export class ProductosModule { }
