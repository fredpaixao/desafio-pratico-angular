import { Routes } from '@angular/router';
import { HomeComponent } from './layouts/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'contabil',
        loadChildren: () => import('./contabil/contabil.routes').then((m) => m.CONTABIL_ROUTES),
      },
      {
        path: '',
        redirectTo: '/contabil/outros-creditos-debitos',
        pathMatch: 'full',
      },
    ],
  },
];
