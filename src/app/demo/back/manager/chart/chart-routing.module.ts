import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'worktime',
        loadComponent: () =>
          import('./worktime/worktime.component'),  
      },
    ],
  },
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: 'fiche',
  //       loadComponent: () =>
  //         import('./fiche/fiche-voiture.component'),  
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartRoutingModule {}
