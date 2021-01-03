import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./web/web.module').then(m => m.WebModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule)
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./server-error/server-error.module').then(
        m => m.ServerErrorModule
      )
  },
  {
    path: 'access-denied',
    loadChildren: () =>
      import('./access-denied/access-denied.module').then(
        m => m.AccessDeniedModule
      )
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  // { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
