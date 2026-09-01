import { Routes } from '@angular/router';
import { Home } from './layouts/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: Home,
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
