import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'pendientes',
    loadChildren: () => import('./pendientes/pendientes.module').then( m => m.PendientesPageModule)
  },
  {
    path: 'ruta',
    loadChildren: () => import('./ruta/ruta.module').then( m => m.RutaPageModule)
  },
  {
    path: 'realizados',
    loadChildren: () => import('./realizados/realizados.module').then( m => m.RealizadosPageModule)
  },
  {
    path: 'estadistica',
    loadChildren: () => import('./estadistica/estadistica.module').then( m => m.EstadisticaPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'capturar/:id',
    loadChildren: () => import('./capturar/capturar.module').then( m => m.CapturarPageModule)
  },
  {
    path: 'reporte/:id',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.ReportePageModule)
  },
  {
    path: 'ver-realizado/:id',
    loadChildren: () => import('./ver-realizado/ver-realizado.module').then( m => m.VerRealizadoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
