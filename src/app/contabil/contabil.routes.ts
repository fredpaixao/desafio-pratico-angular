import { Routes } from '@angular/router';

export const CONTABIL_ROUTES: Routes = [
  {
    path: 'outros-creditos-debitos',
    loadComponent: () =>
      import('./components/other-credits-debits-page/other-credits-debits-page').then(
        (m) => m.OtherCreditsDebitsPage,
      ),
    data: {
      title: 'Outros Créditos/Débitos',
      breadcrumb: [
        { label: 'Início', route: '/contabil' },
        { label: 'Outros Créditos/Débitos' },
      ],
    },
  },
];
