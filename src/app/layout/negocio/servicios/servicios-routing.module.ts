import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { AdicionarServicioComponent } from './adicionar-servicio/adicionar-servicio.component';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';

const routes: Routes = [
  {
    path: '',
    component: ListaServiciosComponent
  },
  {
    path: 'adicionar-servicios',
    component: AdicionarServicioComponent
  },
  {
    path: 'editar-servicio/:id',
    component: EditarServicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule {}
