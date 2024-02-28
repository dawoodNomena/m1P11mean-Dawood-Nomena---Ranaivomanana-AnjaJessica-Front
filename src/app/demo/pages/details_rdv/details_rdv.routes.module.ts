import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
        path: '',
        children: [
        {
            path: 'fiche',
            loadComponent: () =>
            import('./fiche/details_rdv.component'), 
        },
        ],
    },
    {
        path: '',
        children: [
        {
            path: 'liste',
            loadComponent: () =>
            import('./fiche/details_rdv.component'), 
        },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Details_rdvRoutes {}
