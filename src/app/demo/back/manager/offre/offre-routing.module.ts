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
          import('./liste/liste-offre.component'),  
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffreRoutingModule {}
