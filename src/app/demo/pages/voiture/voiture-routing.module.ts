import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        loadComponent: () =>
          import('./ajout/ajout.component'),  
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./liste/liste-voiture.component'),  
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'fiche',
        loadComponent: () =>
          import('./fiche/fiche-voiture.component'),  
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoitureRoutingModule {}
