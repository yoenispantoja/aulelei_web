import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { AdicionarEventosComponent } from './adicionar-eventos/adicionar-eventos.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';


const routes: Routes = [
  {
    path: '',
    component: ListaEventosComponent
  },
  {
    path: 'adicionar-eventos',
    component: AdicionarEventosComponent
  },
  {
    path: 'editar-evento/:id',
    component: EditarEventoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule {}
