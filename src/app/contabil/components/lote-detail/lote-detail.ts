import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Header } from '../../../shared/components/header/header.component';
import { DataTableComponent, ColumnConfig } from '../../../shared/components/data-table/data-table.component';
import { EntryModalComponent } from '../entry-modal/entry-modal.component';
import { ContabilService } from '../../service/contabil.service';
import { Lote, Lancamento } from '../../models/lote.model';

@Component({
  selector: 'app-lote-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    Header,
    DataTableComponent,
  ],
  templateUrl: './lote-detail.html',
  styleUrl: './lote-detail.scss',
})
export class LoteDetailComponent implements OnInit {
  lote: Lote | null = null;
  lancamentos: Lancamento[] = [];
  lancamentosExcluirSelecionados: any[] = [];
  isLoading: boolean = false;
  openModalOnInit: boolean = false;

  get valorLoteCalculado(): number {
    return this.lancamentos.reduce((total: number, lan: any) => total + (lan.valor || 0), 0);
  }

  tableColumnsLancamentos: ColumnConfig[] = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'contaCorrenteNumero', label: 'Número Conta', type: 'text' },
    { key: 'contaCorrenteTitular', label: 'Titular', type: 'text' },
    { key: 'valor', label: 'Valor', type: 'currency' },
    { key: 'historico', label: 'Histórico', type: 'text' },
    { key: 'situacao', label: 'Situação', type: 'text' },
  ];

  displayColumnsLancamentos: string[] = [
    'id',
    'contaCorrenteNumero',
    'contaCorrenteTitular',
    'valor',
    'historico',
    'situacao',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contabilService: ContabilService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const loteId = parseInt(params['id'], 10);
      console.log('Carregando lote:', loteId);
      this.carregarLote(loteId);

      this.route.queryParams.subscribe((queryParams) => {
        if (queryParams['incluir'] === 'true') {
          this.openModalOnInit = true;
        }
      });
    });
  }

  private carregarLote(id: number): void {
    this.isLoading = true;
    this.contabilService.obterLotePorId(id).subscribe({
      next: (lote: Lote) => {
        console.log('Lote carregado:', lote);
        this.lote = lote;
        this.lancamentos = (lote.lancamentos || []).map((lan: any) => ({
          ...lan,
          contaCorrenteNumero: lan.contaCorrente?.numero || '-',
          contaCorrenteTitular: lan.contaCorrente?.titular || '-',
        }));
        this.isLoading = false;
        this.cdr.detectChanges();

        if (this.openModalOnInit) {
          setTimeout(() => this.onIncluir(), 300);
        }
      },
      error: (err: any) => {
        console.error('Erro ao carregar lote:', err);
        this.isLoading = false;
        this.lote = null;
        this.cdr.detectChanges();
        this.router.navigate(['/contabil/outros-creditos-debitos']);
      },
    });
  }

  onIncluir(): void {
    const dialogRef = this.dialog.open(EntryModalComponent, {
      width: '900px',
      maxHeight: '90vh',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe({
      next: (result: Lancamento | undefined) => {
        if (result) {
          this.ngZone.run(() => {
            const lancamentoFormatado: any = {
              ...result,
              contaCorrenteNumero: result.contaCorrente?.numero || '-',
              contaCorrenteTitular: result.contaCorrente?.titular || '-',
            };
            this.lancamentos = [...this.lancamentos, lancamentoFormatado];
            this.cdr.detectChanges();
            console.log('Lançamento adicionado:', lancamentoFormatado);
          });
        }
      },
    });
  }

  onLancamentosSelectionChange(selectedLancamentos: any[]): void {
    this.lancamentosExcluirSelecionados = selectedLancamentos;
  }

  onVisualizar(): void {
    console.log('Visualizar lançamento');
  }

  onAlterar(): void {
    console.log('Alterar lançamento');
  }

  onExcluir(): void {
    if (this.lancamentosExcluirSelecionados.length > 0) {
      const idsParaExcluir = this.lancamentosExcluirSelecionados.map((lan: any) => lan.id);
      this.lancamentos = this.lancamentos.filter((lan: any) => !idsParaExcluir.includes(lan.id));
      this.lancamentosExcluirSelecionados = [];
      this.cdr.detectChanges();
      console.log('Lançamento(s) excluído(s):', idsParaExcluir);
    }
  }

  onDuplicar(): void {
    console.log('Duplicar lançamento');
  }

  onVoltar(): void {
    this.router.navigate(['/contabil/outros-creditos-debitos']);
  }
}
