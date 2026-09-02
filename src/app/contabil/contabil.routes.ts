import { Routes } from '@angular/router';

export const CONTABIL_ROUTES: Routes = [
  {
    path: 'outros-creditos-debitos',
    loadComponent: () =>
      import('./components/other-credits-debits-page/other-credits-debits-page.component').then(
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
  {
    path: 'lotes/:id',
    loadComponent: () =>
      import('./components/lote-detail/lote-detail').then(
        (m) => m.LoteDetailComponent,
      ),
    data: {
      title: 'Detalhe do Lote',
      breadcrumb: [
        { label: 'Início', route: '/contabil' },
        { label: 'Outros Créditos/Débitos', route: '/contabil/outros-creditos-debitos' },
        { label: 'Detalhe do Lote' },
      ],
    },
  },
];
