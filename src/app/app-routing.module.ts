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
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'voiture',
        loadChildren: () =>
          import('./demo/pages/voiture/voiture.modules').then(
            (m) => m.VoitureModule
          ),
          
      },
      {
        path: 'reparation',
        loadChildren: () =>
          import('./demo/pages/reparation/reparation.module').then(
            (m) => m.ReparationModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'facture',
        loadChildren: () =>
          import('./demo/pages/facture/facture.module').then(
            (m) => m.FactureModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'journal',
        loadChildren: () =>
          import('./demo/pages/journal/journal.modules').then(
            (m) => m.JournaModules
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./demo/pages/core-chart/core-chart.module').then(
            (m) => m.CoreChartModule
          ),
          canActivate: [AuthGuard],
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/extra/sample-page/sample-page.component'),
          canActivate: [AuthGuard],
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
    ],
  },
  // {
  //   path: '',
  //   component: ClientComponent,
  //   children: [
  //     {
  //       path: 'accueil',
  //       loadComponent: () => import('./demo/accueil/accueil.component'),
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'services',
  //       loadComponent: () => import('./demo/services/servicescomponent'), 
  //       pathMatch: 'full',
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
