import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListaGaleriasComponent } from "./lista-galerias/lista-galerias.component";
import { AdicionarGaleriasComponent } from "./adicionar-galerias/adicionar-galerias.component";
import { EditarGaleriasComponent } from './editar-galeria/editar-galeria.component';

const routes: Routes = [
  {
    path: "",
    component: ListaGaleriasComponent
  },
  {
    path: "adicionar-galerias",
    component: AdicionarGaleriasComponent
  },
  {
    path: "editar-galeria/:id",
    component: EditarGaleriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaleriasRoutingModule {}
