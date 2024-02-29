import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { ClientComponent } from './theme/layout/client/client.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full',
      },
      {
        path: 'mes_rdv',
        loadChildren: () => import('./demo/back/employe/mes_rdv/mes_rdv.module').then(
          (m) => m.Mes_rdvModule
        ),
      },
      {
        path: 'mes_rdv',
        loadChildren: () => import('./demo/back/employe/details_rdv/details_rdv.module').then(
          (m) => m.Details_rdvModule
        ),
      },
      {
        path: 'suivi_tache',
        loadComponent: () => import('./demo/back/employe/suivi_tache/suivi_tache.component'),
        pathMatch: 'full',
      },
      {
        path: 'permission',
        loadComponent: () => import('./demo/back/employe/permission/permission.component'),
        pathMatch: 'full',
      },
      {
        path: 'personnel',
        loadChildren: () => import('./demo/back/manager/personnel/personnel.modules').then(
          (m) => m.PersonnelModule
        ),
      },
      {
        path: 'services',
        loadChildren: () => import('./demo/back/manager/services/services.modules').then(
          (m) => m.ServicesModule
        ),
      },
      {
        path: 'offre',
        loadChildren: () => import('./demo/back/manager/offre/offre.modules').then(
          (m) => m.OffrelModule
        ),
      },
      {
        path: 'chart',
        loadChildren: () => import('./demo/back/manager/chart/chart.modules').then(
          (m) => m.ChartModule
        ),
      },      
    ],
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: 'accueil',
        loadComponent: () => import('./demo/accueil/accueil.component'),
        pathMatch: 'full',
      },
      {
        path: 'services',
        loadComponent: () => import('./demo/services/servicescomponent'), 
        pathMatch: 'full',
      },
      {
        path: 'reservation',
        loadComponent: () => import('./demo/reservation/reservationcomponent'), 
        pathMatch: 'full',
      },
      {
        path: 'historique_rdv',
        loadComponent: () => import('./demo/historique_rdv/historique_rdvcomponent'), 
        pathMatch: 'full',
      },
      {
        path: 'details_rdv',
        loadChildren: () =>
          import('./demo/pages/details_rdv/details_rdv.module').then(
            (m) => m.Details_rdvModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'preference',
        loadComponent: () => import('./demo/pages/preference/preference.component'),
        pathMatch: 'full',
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
