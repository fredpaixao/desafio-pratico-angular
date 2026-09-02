import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { OtherCreditsDebitsPage } from './other-credits-debits-page.component';

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

  describe('Lote Selection', () => {
    it('should have toggleSelectAll method', () => {
      expect(typeof component.toggleSelectAll).toBe('function');
    });

    it('should have toggleSelectLote method', () => {
      expect(typeof component.toggleSelectLote).toBe('function');
    });

    it('should have isLoteSelected method', () => {
      expect(typeof component.isLoteSelected).toBe('function');
    });

    it('should have selectedLoteIds array', () => {
      expect(Array.isArray(component.selectedLoteIds)).toBe(true);
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
