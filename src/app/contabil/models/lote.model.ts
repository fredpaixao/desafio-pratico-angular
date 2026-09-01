export interface Lancamento {
  id: number;
  descricao: string;
  valor: number;
  data: string;
}

export interface Lote {
  idLote: number;
  dataEntrada: string;
  valor: string;
  quantLancamentos: number;
  usuarioRegistro: string;
  usuarioAprovacao: string;
  situacaoLote: 'Aberto' | 'Enviado' | 'Confirmado';
  dataHoraSituacao: string;
  lancamentos?: Lancamento[];
}

export interface FiltrosPesquisa {
  instituicaoResp: string;
  instituicao: string;
  situacaoLote: 'todas' | 'aberto' | 'enviado' | 'confirmado';
  idLoteFrom: string;
  idLoteTo: string;
  valorLoteFrom: string;
  valorLoteTo: string;
  dataEntradaFrom: string;
  dataEntradaTo: string;
}

export interface ResultadoPesquisa {
  lotes: Lote[];
  total: number;
  pagina: number;
  tamanhoPagina: number;
}
