import { TestBed } from '@angular/core/testing';
import { ContabilService } from './contabil.service';
import { Lote, FiltrosPesquisa } from '../models/lote.model';

describe('ContabilService', () => {
  let service: ContabilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContabilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('pesquisarLotes', () => {
    it('should return lotes with pagination', (done) => {
      const filtros: FiltrosPesquisa = {
        instituicaoResp: '',
        instituicao: '',
        situacaoLote: 'todas',
        idLoteFrom: '',
        idLoteTo: '',
        valorLoteFrom: '',
        valorLoteTo: '',
        dataEntradaFrom: '',
        dataEntradaTo: '',
      };

      service.pesquisarLotes(filtros, 0, 10).subscribe((resultado) => {
        expect(resultado.lotes).toBeDefined();
        expect(Array.isArray(resultado.lotes)).toBe(true);
        expect(resultado.total).toBeGreaterThan(0);
        expect(resultado.pagina).toBe(0);
        expect(resultado.tamanhoPagina).toBe(10);
        done();
      });
    });

    it('should filter lotes by situacao', (done) => {
      const filtros: FiltrosPesquisa = {
        instituicaoResp: '',
        instituicao: '',
        situacaoLote: 'aberto',
        idLoteFrom: '',
        idLoteTo: '',
        valorLoteFrom: '',
        valorLoteTo: '',
        dataEntradaFrom: '',
        dataEntradaTo: '',
      };

      service.pesquisarLotes(filtros, 0, 10).subscribe((resultado) => {
        resultado.lotes.forEach((lote) => {
          expect(lote.situacaoLote.toLowerCase()).toBe('aberto');
        });
        done();
      });
    });

    it('should filter lotes by id range', (done) => {
      const filtros: FiltrosPesquisa = {
        instituicaoResp: '',
        instituicao: '',
        situacaoLote: 'todas',
        idLoteFrom: '1',
        idLoteTo: '2',
        valorLoteFrom: '',
        valorLoteTo: '',
        dataEntradaFrom: '',
        dataEntradaTo: '',
      };

      service.pesquisarLotes(filtros, 0, 10).subscribe((resultado) => {
        resultado.lotes.forEach((lote) => {
          expect(lote.idLote).toBeGreaterThanOrEqual(1);
          expect(lote.idLote).toBeLessThanOrEqual(2);
        });
        done();
      });
    });

    it('should filter lotes by valor range', (done) => {
      const filtros: FiltrosPesquisa = {
        instituicaoResp: '',
        instituicao: '',
        situacaoLote: 'todas',
        idLoteFrom: '',
        idLoteTo: '',
        valorLoteFrom: '1000',
        valorLoteTo: '3000',
        dataEntradaFrom: '',
        dataEntradaTo: '',
      };

      service.pesquisarLotes(filtros, 0, 10).subscribe((resultado) => {
        resultado.lotes.forEach((lote) => {
          expect(lote.valor).toBeGreaterThanOrEqual(1000);
          expect(lote.valor).toBeLessThanOrEqual(3000);
        });
        done();
      });
    });

    it('should return paginated results', (done) => {
      const filtros: FiltrosPesquisa = {
        instituicaoResp: '',
        instituicao: '',
        situacaoLote: 'todas',
        idLoteFrom: '',
        idLoteTo: '',
        valorLoteFrom: '',
        valorLoteTo: '',
        dataEntradaFrom: '',
        dataEntradaTo: '',
      };

      service.pesquisarLotes(filtros, 0, 1).subscribe((resultado) => {
        expect(resultado.lotes.length).toBeLessThanOrEqual(1);
        done();
      });
    });
  });

  describe('buscarContasCorrentes', () => {
    it('should return contas correntes', (done) => {
      service.buscarContasCorrentes('').subscribe((contas) => {
        expect(Array.isArray(contas)).toBe(true);
        expect(contas.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should filter contas by numero', (done) => {
      service.buscarContasCorrentes('1001').subscribe((contas) => {
        expect(contas.length).toBeGreaterThan(0);
        contas.forEach((conta) => {
          expect(conta.numero).toContain('1001');
        });
        done();
      });
    });

    it('should filter contas by nome', (done) => {
      service.buscarContasCorrentes('Principal').subscribe((contas) => {
        expect(contas.length).toBeGreaterThan(0);
        contas.forEach((conta) => {
          expect(conta.nome.toLowerCase()).toContain('principal');
        });
        done();
      });
    });

    it('should filter contas by titular', (done) => {
      service.buscarContasCorrentes('João').subscribe((contas) => {
        expect(contas.length).toBeGreaterThan(0);
        contas.forEach((conta) => {
          expect(conta.titular.toLowerCase()).toContain('joão');
        });
        done();
      });
    });
  });

  describe('obterHistoricos', () => {
    it('should return historicos', (done) => {
      service.obterHistoricos().subscribe((historicos) => {
        expect(Array.isArray(historicos)).toBe(true);
        expect(historicos.length).toBeGreaterThan(0);
        expect(historicos[0].value).toBeDefined();
        expect(historicos[0].label).toBeDefined();
        done();
      });
    });
  });

  describe('obterPA', () => {
    it('should return PA options', (done) => {
      service.obterPA().subscribe((paOptions) => {
        expect(Array.isArray(paOptions)).toBe(true);
        expect(paOptions.length).toBeGreaterThan(0);
        expect(paOptions[0].value).toBeDefined();
        expect(paOptions[0].label).toBeDefined();
        done();
      });
    });
  });

  describe('obterContaCorrente', () => {
    it('should return conta corrente by numero', (done) => {
      service.obterContaCorrente('1001').subscribe((conta) => {
        expect(conta).toBeTruthy();
        expect(conta?.numero).toBe('1001');
        expect(conta?.nome).toBeDefined();
        expect(conta?.titular).toBeDefined();
        done();
      });
    });

    it('should return null for non-existent conta', (done) => {
      service.obterContaCorrente('9999').subscribe((conta) => {
        expect(conta).toBeNull();
        done();
      });
    });
  });
});
