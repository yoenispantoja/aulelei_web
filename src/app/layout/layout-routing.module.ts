import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // **********  BLOG  *********** */
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'publicaciones',
        loadChildren: () =>
          import('./blog/publicaciones/publicaciones.module').then(
            m => m.PublicacionesModule
          )
      },
      {
        path: 'medias',
        loadChildren: () =>
          import('./blog/medias/medias.module').then(m => m.MediasModule)
      },
      {
        path: 'galerias',
        loadChildren: () =>
          import('./blog/galerias/galerias.module').then(m => m.GaleriasModule)
      },
      {
        path: 'eventos',
        loadChildren: () =>
          import('./blog/eventos/eventos.module').then(m => m.EventosModule)
      },
      // **********  NEGOCIO  ************* */
      {
        path: 'servicios',
        loadChildren: () =>
          import('./negocio/servicios/servicios.module').then(m => m.ServiciosModule)
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('./negocio/productos/productos.module').then(m => m.ProductosModule)
      },
      {
        path: 'reservas',
        loadChildren: () =>
          import('./negocio/reservas/reservas.module').then(m => m.ReservasModule)
      },
      // **********  RECURSOS HUMANOS  ******* */
      {
        path: 'trabajadores',
        loadChildren: () =>
          import('./rrhh/trabajadores/trabajadores.module').then(m => m.TrabajadoresModule)
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./rrhh/clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./rrhh/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
