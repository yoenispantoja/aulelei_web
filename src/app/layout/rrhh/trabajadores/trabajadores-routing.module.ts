import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaTrabajadoresComponent } from './lista-trabajadores/lista-trabajadores.component';
import { AdicionarTrabajadoresComponent } from './adicionar-trabajadores/adicionar-trabajadores.component';
import { EditarTrabajadorComponent } from './editar-trabajador/editar-trabajador.component';

const routes: Routes = [
  {
    path: '',
    component: ListaTrabajadoresComponent
  },
  {
    path: 'adicionar-trabajadores',
    component: AdicionarTrabajadoresComponent
  },
  {
    path: 'editar-trabajador/:id',
    component: EditarTrabajadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajadoresRoutingModule {}
