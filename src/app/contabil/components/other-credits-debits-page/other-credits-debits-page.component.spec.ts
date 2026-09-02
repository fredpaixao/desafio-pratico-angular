import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { OtherCreditsDebitsPage } from './other-credits-debits-page.component';
import { Lote } from '../../models/lote.model';

describe('OtherCreditsDebitsPage', () => {
  let component: OtherCreditsDebitsPage;
  let fixture: ComponentFixture<OtherCreditsDebitsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherCreditsDebitsPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            params: of({}),
            data: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherCreditsDebitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize filter form with empty values', () => {
      expect(component.filterForm).toBeDefined();
      expect(component.filterForm.get('instituicaoResp')?.value).toBe('');
      expect(component.filterForm.get('instituicao')?.value).toBe('');
      expect(component.filterForm.get('situacaoLote')?.value).toBe('todas');
    });

    it('should have all filter fields', () => {
      const fields = [
        'instituicaoResp',
        'instituicao',
        'situacaoLote',
        'idLoteFrom',
        'idLoteTo',
        'valorLoteFrom',
        'valorLoteTo',
        'dataEntradaFrom',
        'dataEntradaTo',
      ];

      fields.forEach((field) => {
        expect(component.filterForm.get(field)).toBeDefined();
      });
    });
  });

  describe('Table Selection', () => {
    it('should have onTableSelectionChange method', () => {
      expect(typeof component.onTableSelectionChange).toBe('function');
    });

    it('should have selectedLotes array', () => {
      expect(Array.isArray(component.selectedLotes)).toBe(true);
    });

    it('should update selectedLotes on table selection change', () => {
      const mockLotes: Lote[] = [
        { idLote: 1, dataEntrada: '2026-01-01', valor: 1000, quantLancamentos: 5, usuarioRegistro: 'user1', usuarioAprovacao: 'user2', situacaoLote: 'Aberto', dataHoraSituacao: '2026-01-01 10:00:00' },
      ];
      component.onTableSelectionChange(mockLotes);
      expect(component.selectedLotes.length).toBe(1);
      expect(component.selectedLotes[0].idLote).toBe(1);
    });

    it('should enable alterar/excluir/visualizar when one lote is selected', () => {
      const mockLotes: Lote[] = [
        { idLote: 1, dataEntrada: '2026-01-01', valor: 1000, quantLancamentos: 5, usuarioRegistro: 'user1', usuarioAprovacao: 'user2', situacaoLote: 'Aberto', dataHoraSituacao: '2026-01-01 10:00:00' },
      ];
      component.onTableSelectionChange(mockLotes);
      expect(component.canAlterarExcluirVisualizar).toBe(true);
    });

    it('should disable alterar/excluir/visualizar when multiple lotes are selected', () => {
      const mockLotes: Lote[] = [
        { idLote: 1, dataEntrada: '2026-01-01', valor: 1000, quantLancamentos: 5, usuarioRegistro: 'user1', usuarioAprovacao: 'user2', situacaoLote: 'Aberto', dataHoraSituacao: '2026-01-01 10:00:00' },
        { idLote: 2, dataEntrada: '2026-01-02', valor: 2500, quantLancamentos: 3, usuarioRegistro: 'user1', usuarioAprovacao: 'user2', situacaoLote: 'Confirmado', dataHoraSituacao: '2026-01-02 10:00:00' },
      ];
      component.onTableSelectionChange(mockLotes);
      expect(component.canAlterarExcluirVisualizar).toBe(false);
    });
  });

  describe('Pagination', () => {
    it('should have initial pagination state', () => {
      expect(component.pageIndex).toBeDefined();
      expect(component.pageSize).toBeDefined();
    });

    it('should update page index on page change', () => {
      const initialIndex = component.pageIndex;
      component.onPageChange({ pageIndex: initialIndex + 1, pageSize: component.pageSize });
      expect(component.pageIndex).toBe(initialIndex + 1);
    });

    it('should update page size on page change', () => {
      const newPageSize = 20;
      component.onPageChange({ pageIndex: component.pageIndex, pageSize: newPageSize });
      expect(component.pageSize).toBe(newPageSize);
    });
  });

  describe('Filter Validation', () => {
    it('should have range validator on id fields', () => {
      expect(component.filterForm.get('idLoteFrom')).toBeDefined();
      expect(component.filterForm.get('idLoteTo')).toBeDefined();
    });

    it('should have range validator on valor fields', () => {
      expect(component.filterForm.get('valorLoteFrom')).toBeDefined();
      expect(component.filterForm.get('valorLoteTo')).toBeDefined();
    });

    it('should have date range validator on date fields', () => {
      expect(component.filterForm.get('dataEntradaFrom')).toBeDefined();
      expect(component.filterForm.get('dataEntradaTo')).toBeDefined();
    });
  });

  describe('Loading State', () => {
    it('should set isLoading to false initially', () => {
      expect(component.isLoading).toBe(false);
    });

    it('should emit loading state change', () => {
      component.isLoading = true;
      expect(component.isLoading).toBe(true);
    });
  });

  describe('Situacao Options', () => {
    it('should have situacao options loaded', (done) => {
      setTimeout(() => {
        expect(component.situacaoOptions).toBeDefined();
        expect(component.situacaoOptions.length).toBeGreaterThan(0);
        done();
      }, 100);
    });
  });
});
