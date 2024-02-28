import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./mes_rdv.component'),
      },
    ],
  },
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: 'fiche',
  //       loadComponent: () =>
  //         import('../fiche/fiche-voiture.component'),
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormElementsRoutingModule {}
