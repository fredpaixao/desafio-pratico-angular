import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Lote, FiltrosPesquisa, ResultadoPesquisa, ContaCorrente } from '../models/lote.model';

export interface OptionValue {
  value: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContabilService {
  private mockContasCorrentes: ContaCorrente[] = [
    { id: 1, numero: '1001', nome: 'Conta Principal', titular: 'João Silva' },
    { id: 2, numero: '1002', nome: 'Conta Operacional', titular: 'Maria Santos' },
    { id: 3, numero: '1003', nome: 'Conta Investimento', titular: 'Pedro Costa' },
    { id: 4, numero: '1004', nome: 'Conta Reserva', titular: 'Ana Oliveira' },
    { id: 5, numero: '1005', nome: 'Conta Administrativo', titular: 'Carlos Mendes' },
  ];

  private mockHistoricos: OptionValue[] = [
    { value: 'lancamento_manual', label: 'Lançamento Manual' },
    { value: 'transferencia', label: 'Transferência' }
  ];

  private mockPA: OptionValue[] = [
    { value: 'cooperativa', label: 'Cooperativa' },
    { value: 'pessoa_fisica', label: 'Pessoa Física' },
  ];

  private mockLotes: Lote[] = [
    {
      idLote: 1,
      dataEntrada: '26/04/2026',
      valor: 1000,
      quantLancamentos: 1,
      usuarioRegistro: 'gsarq0300_00',
      usuarioAprovacao: '-',
      situacaoLote: 'Aberto',
      dataHoraSituacao: '27/04/2026, 12:35:11',
      lancamentos: [
        {
          id: 1,
          contaCorrente: { id: 1, numero: '1001', nome: 'Conta Principal', titular: 'João Silva' },
          valor: 1000,
          historico: 'Lançamento Manual',
          estorno: false,
          documento: 'DOC001',
          descricao: 'Lançamento inicial',
          situacao: 'Pendente',
          pa: 'cooperativa',
          idEvento: '',
          complHistorico: '',
          situacaoCsc: 'Aguardando Processamento CCO',
          idDocCsc: '',
        },
      ],
    },
    {
      idLote: 2,
      dataEntrada: '25/04/2026',
      valor: 2500,
      quantLancamentos: 3,
      usuarioRegistro: 'user0001_00',
      usuarioAprovacao: 'aprv0001_00',
      situacaoLote: 'Enviado',
      dataHoraSituacao: '26/04/2026, 14:20:05',
      lancamentos: [
        {
          id: 2,
          contaCorrente: { id: 2, numero: '1002', nome: 'Conta Operacional', titular: 'Maria Santos' },
          valor: 800,
          historico: 'Lançamento Manual',
          estorno: false,
          documento: 'DOC002',
          descricao: 'Primeira operação',
          situacao: 'Confirmado',
          pa: 'pessoa_fisica',
          idEvento: 'EV001',
          complHistorico: '',
          situacaoCsc: 'Processado',
          idDocCsc: 'CSC001',
        },
        {
          id: 3,
          contaCorrente: { id: 1, numero: '1001', nome: 'Conta Principal', titular: 'João Silva' },
          valor: 900,
          historico: 'Transferência',
          estorno: false,
          documento: 'DOC003',
          descricao: 'Transferência entre contas',
          situacao: 'Confirmado',
          pa: 'cooperativa',
          idEvento: 'EV002',
          complHistorico: '',
          situacaoCsc: 'Processado',
          idDocCsc: 'CSC002',
        },
        {
          id: 4,
          contaCorrente: { id: 3, numero: '1003', nome: 'Conta Investimento', titular: 'Pedro Costa' },
          valor: 800,
          historico: 'Lançamento Manual',
          estorno: false,
          documento: 'DOC004',
          descricao: 'Aplicação de recurso',
          situacao: 'Confirmado',
          pa: 'pessoa_fisica',
          idEvento: 'EV003',
          complHistorico: '',
          situacaoCsc: 'Processado',
          idDocCsc: 'CSC003',
        },
      ],
    },
    {
      idLote: 3,
      dataEntrada: '24/04/2026',
      valor: 5000,
      quantLancamentos: 5,
      usuarioRegistro: 'user0002_00',
      usuarioAprovacao: 'aprv0002_00',
      situacaoLote: 'Confirmado',
      dataHoraSituacao: '25/04/2026, 09:15:30',
      lancamentos: [
        {
          id: 5,
          contaCorrente: { id: 1, numero: '1001', nome: 'Conta Principal', titular: 'João Silva' },
          valor: 1200,
          historico: 'Lançamento Manual',
          estorno: false,
          documento: 'DOC005',
          descricao: 'Pagamento de fornecedor',
          situacao: 'Confirmado',
          pa: 'cooperativa',
          idEvento: 'EV004',
          complHistorico: '',
          situacaoCsc: 'Processado',
          idDocCsc: 'CSC004',
        },
        {
          id: 6,
          contaCorrente: { id: 2, numero: '1002', nome: 'Conta Operacional', titular: 'Maria Santos' },
          valor: 1500,
          historico: 'Transferência',
          estorno: false,
          documento: 'DOC006',
          descricao: 'Recebimento de cliente',
          situacao: 'Confirmado',
          pa: 'pessoa_fisica',
          idEvento: 'EV005',
          complHistorico: '',
          situacaoCsc: 'Processado',
          idDocCsc: 'CSC005',
        },
        {
          id: 7,
          contaCorrente: { id: 4, numero: '1004', nome: 'Conta Reserva', titular: 'Ana Oliveira' },
          valor: 800,
          historico: 'Lançamento Manual',
          estorno: false,
          documento: 'DOC007',
          descricao: 'Constituição de reserva',
          situacao: 'Confirmado',
          pa: 'cooperativa',
          idEvento: 'EV006',
          complHistorico: '',
          situacaoCsc: 'Processado',
          idDocCsc: 'CSC006',
        },
        {
          id: 8,
          contaCorrente: { id: 5, numero: '1005', nome: 'Conta Administrativo', titular: 'Carlos Mendes' },
          valor: 700,
          historico: 'Lançamento Manual',
          estorno: false,
          documento: 'DOC008',
          descricao: 'Custos administrativos',
          situacao: 'Confirmado',
          pa: 'pessoa_fisica',
          idEvento: 'EV007',
          complHistorico: '',
          situacaoCsc: 'Processado',
          idDocCsc: 'CSC007',
        },
        {
          id: 9,
          contaCorrente: { id: 3, numero: '1003', nome: 'Conta Investimento', titular: 'Pedro Costa' },
          valor: 800,
          historico: 'Transferência',
          estorno: false,
          documento: 'DOC009',
          descricao: 'Redistribuição de fundos',
          situacao: 'Confirmado',
          pa: 'cooperativa',
          idEvento: 'EV008',
          complHistorico: '',
          situacaoCsc: 'Processado',
          idDocCsc: 'CSC008',
        },
      ],
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

      const loteValorNumerico: number = lote.valor;
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

  buscarContasCorrentes(termo: string): Observable<ContaCorrente[]> {
    const termoLower: string = termo.toLowerCase();
    const contas: ContaCorrente[] = this.mockContasCorrentes.filter((conta: ContaCorrente) =>
      conta.numero.includes(termoLower) ||
      conta.nome.toLowerCase().includes(termoLower) ||
      conta.titular.toLowerCase().includes(termoLower)
    );

    return of(contas).pipe(delay(300));
  }

  obterContaCorrente(numero: string): Observable<ContaCorrente | null> {
    const conta: ContaCorrente | undefined = this.mockContasCorrentes.find(
      (c: ContaCorrente) => c.numero === numero
    );
    return of(conta || null).pipe(delay(200));
  }

  obterLotePorId(id: number): Observable<Lote> {
    const lote: Lote | undefined = this.mockLotes.find((l: Lote) => l.idLote === id);
    if (!lote) {
      return throwError(() => new Error(`Lote ${id} não encontrado`));
    }
    return of(lote).pipe(delay(300));
  }

  obterHistoricos(): Observable<OptionValue[]> {
    return of(this.mockHistoricos).pipe(delay(100));
  }

  obterPA(): Observable<OptionValue[]> {
    return of(this.mockPA).pipe(delay(100));
  }
}
