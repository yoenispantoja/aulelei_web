import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component';
import { EditarReservaComponent } from './editar-reserva/editar-reserva.component';
import { AdicionarReservaComponent } from './adicionar-reserva/adicionar-reserva.component';

const routes: Routes = [
  {
    path: '',
    component: ListaReservasComponent
  },
  {
    path: 'adicionar-reservas',
    component: AdicionarReservaComponent
  },
  {
    path: 'editar-reserva/:id',
    component: EditarReservaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule {}
