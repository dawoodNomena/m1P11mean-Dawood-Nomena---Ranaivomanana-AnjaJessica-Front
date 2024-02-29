import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'depense',
        loadChildren: () =>
          import('./depense/depense.modules').then((m) => m.DepenselModule),  
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'salaire',
        loadComponent: () =>
          import('./salaire/salaire.modules').then((m) => m.SalaireModule),  
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepensesRoutingModule {}
