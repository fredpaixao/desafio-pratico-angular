export interface ContaCorrente {
  id: number;
  numero: string;
  nome: string;
  titular: string;
}

export interface Anexo {
  id: number;
  nomeReduzido: string;
  descricao: string;
  dataInclusao: string;
  idUsuario: string;
}

export interface Lancamento {
  id: number;
  contaCorrente: ContaCorrente;
  valor: number;
  historico: string;
  estorno: boolean;
  documento: string;
  descricao: string;
  situacao: 'Pendente' | 'Confirmado' | 'Rejeitado';
  pa: string;
  idEvento: string;
  complHistorico: string;
  situacaoCsc: string;
  idDocCsc: string;
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
