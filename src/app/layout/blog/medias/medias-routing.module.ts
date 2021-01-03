import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaMediasComponent } from './lista-medias/lista-medias.component';
import { AdicionarMediasComponent } from './adicionar-medias/adicionar-medias.component';

const routes: Routes = [
  {
    path: '', component: ListaMediasComponent
  },
  {
    path: "adicionar-medias",
    component: AdicionarMediasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediasRoutingModule { }
