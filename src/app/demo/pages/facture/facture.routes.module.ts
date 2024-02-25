import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
        path: '',
        children: [
        {
            path: 'fiche',
            loadComponent: () =>
            import('./fiche/fiche-facture.component'), 
        },
        ],
    },
    {
        path: '',
        children: [
        {
            path: 'liste',
            loadComponent: () =>
            import('./fiche/fiche-facture.component'), 
        },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FactureRoutes {}
