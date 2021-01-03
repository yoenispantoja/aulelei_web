import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { BlogComponent } from './blog/blog.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { EventoComponent } from './evento/evento.component';
import { ReservarComponent } from './reservar/reservar.component';
import { TiendaComponent } from './tienda/tienda.component';

// Rutas de la vista Web
const routes: Routes = [
  {
    path: '', component: IndexComponent,
  },
  {
    path: 'articulos/:id', component: BlogComponent,
  },
  {
    path: 'galerias/:id', component: GaleriaComponent,
  },
  {
    path: 'eventos/:id', component: EventoComponent,
  },
  {
    path: 'reservar', component: ReservarComponent,
  },
  {
    path: 'tienda', component: TiendaComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
