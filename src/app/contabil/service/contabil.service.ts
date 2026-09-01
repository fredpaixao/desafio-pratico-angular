import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Lote, FiltrosPesquisa, ResultadoPesquisa } from '../models/lote.model';

@Injectable({
  providedIn: 'root',
})
export class ContabilService {
  private mockLotes: Lote[] = [
    {
      idLote: 1,
      dataEntrada: '26/04/2026',
      valor: '1.000,00',
      quantLancamentos: 1,
      usuarioRegistro: 'gsarq0300_00',
      usuarioAprovacao: '-',
      situacaoLote: 'Aberto',
      dataHoraSituacao: '27/04/2026, 12:35:11',
    },
    {
      idLote: 2,
      dataEntrada: '25/04/2026',
      valor: '2.500,00',
      quantLancamentos: 3,
      usuarioRegistro: 'user0001_00',
      usuarioAprovacao: 'aprv0001_00',
      situacaoLote: 'Enviado',
      dataHoraSituacao: '26/04/2026, 14:20:05',
    },
    {
      idLote: 3,
      dataEntrada: '24/04/2026',
      valor: '5.000,00',
      quantLancamentos: 5,
      usuarioRegistro: 'user0002_00',
      usuarioAprovacao: 'aprv0002_00',
      situacaoLote: 'Confirmado',
      dataHoraSituacao: '25/04/2026, 09:15:30',
    },
  ];

  constructor() {}

  pesquisarLotes(filtros: FiltrosPesquisa, pagina: number = 0, tamanhoPagina: number = 10): Observable<ResultadoPesquisa> {
    const lotesFiltrados: Lote[] = this.aplicarFiltros(filtros);
    const inicio: number = pagina * tamanhoPagina;
    const fim: number = inicio + tamanhoPagina;
    const lotesPaginados: Lote[] = lotesFiltrados.slice(inicio, fim);

    const resultado: ResultadoPesquisa = {
      lotes: lotesPaginados,
      total: lotesFiltrados.length,
      pagina: pagina,
      tamanhoPagina: tamanhoPagina,
    };

    return of(resultado).pipe(delay(500));
  }

  private aplicarFiltros(filtros: FiltrosPesquisa): Lote[] {
    return this.mockLotes.filter((lote: Lote) => {
      const filtroSituacao: boolean = filtros.situacaoLote === 'todas' ||
        lote.situacaoLote.toLowerCase() === filtros.situacaoLote;

      const filtroIdLoteFrom: boolean = !filtros.idLoteFrom ||
        lote.idLote >= parseInt(filtros.idLoteFrom);

      const filtroIdLoteTo: boolean = !filtros.idLoteTo ||
        lote.idLote <= parseInt(filtros.idLoteTo);

      const loteValorNumerico: number = parseFloat(lote.valor.replace(/\./g, '').replace(',', '.'));
      const filtroValorFrom: boolean = !filtros.valorLoteFrom ||
        loteValorNumerico >= parseFloat(filtros.valorLoteFrom);

      const filtroValorTo: boolean = !filtros.valorLoteTo ||
        loteValorNumerico <= parseFloat(filtros.valorLoteTo);

      const loteData: Date = this.parseData(lote.dataEntrada);
      const dataFrom: Date | null = filtros.dataEntradaFrom ? this.parseDataISO(filtros.dataEntradaFrom) : null;
      const dataTo: Date | null = filtros.dataEntradaTo ? this.parseDataISO(filtros.dataEntradaTo) : null;

      const filtroDataFrom: boolean = !dataFrom || loteData >= dataFrom;
      const filtroDataTo: boolean = !dataTo || loteData <= dataTo;

      return filtroSituacao && filtroIdLoteFrom && filtroIdLoteTo &&
             filtroValorFrom && filtroValorTo && filtroDataFrom && filtroDataTo;
    });
  }

  private parseData(dataStr: string): Date {
    const [dia, mes, ano] = dataStr.split('/');
    return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  }

  private parseDataISO(dataStr: string): Date {
    const [ano, mes, dia] = dataStr.split('-');
    return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  }
}
