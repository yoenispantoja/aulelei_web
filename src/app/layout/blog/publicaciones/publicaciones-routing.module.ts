import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListaPublicacionesComponent } from "./lista-publicaciones/lista-publicaciones.component";
import { AdicionarPublicacionesComponent } from "./adicionar-publicaciones/adicionar-publicaciones.component";
import { EditarPublicacionComponent } from './editar-publicacion/editar-publicacion.component';

const routes: Routes = [
  {
    path: "",
    component: ListaPublicacionesComponent
  },
  {
    path: "adicionar-publicaciones",
    component: AdicionarPublicacionesComponent
  },
  {
    path: "editar-publicacion/:id",
    component: EditarPublicacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicacionesRoutingModule {}
