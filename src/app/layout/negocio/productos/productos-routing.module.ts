import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AdicionarProductoComponent } from './adicionar-producto/adicionar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

const routes: Routes = [
  {
    path: '',
    component: ListaProductosComponent
  },
  {
    path: 'adicionar-productos',
    component: AdicionarProductoComponent
  },
  {
    path: 'editar-producto/:id',
    component: EditarProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule {}
