import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Header } from "../../../shared/components/header/header.component";
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { EntryModalComponent } from '../entry-modal/entry-modal.component';
import { CurrencyBrPipe } from '../../../shared/pipes/currency-br.pipe';
import { ContabilService } from '../../service/contabil.service';
import { Lote, FiltrosPesquisa, ResultadoPesquisa, Lancamento } from '../../models/lote.model';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    Header,
    PaginationComponent,
    CurrencyBrPipe,
  ],
  selector: 'app-other-credits-debits-page',
  styleUrl: './other-credits-debits-page.component.scss',
  templateUrl: './other-credits-debits-page.component.html',
})
export class OtherCreditsDebitsPage implements OnInit {
  filterForm!: FormGroup;
  displayedColumns: string[] = [
    'checkbox',
    'idLote',
    'dataEntrada',
    'valor',
    'quantLancamentos',
    'usuarioRegistro',
    'usuarioAprovacao',
    'situacaoLote',
    'dataHoraSituacao',
  ];
  tableData: Lote[] = [];
  isLoading: boolean = false;
  totalResultados: number = 0;
  selectedLoteIds: number[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;

  isAllSelected: boolean = false;
  canAlterarExcluirVisualizar: boolean = false;
  canConfirmar: boolean = true;
  canEnviar: boolean = true;
  canVisualizarJustificativa: boolean = true;
  canIncluir: boolean = true;

  situacaoOptions: Array<{ value: string; label: string }> = [
    { value: 'todas', label: 'Todas' },
    { value: 'aberto', label: 'Aberto' },
    { value: 'enviado', label: 'Enviado' },
    { value: 'confirmado', label: 'Confirmado' },
  ];

  constructor(
    private fb: FormBuilder,
    private contabilService: ContabilService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.filterForm = this.fb.group({
      instituicaoResp: [''],
      instituicao: [''],
      situacaoLote: ['todas'],
      idLoteFrom: [''],
      idLoteTo: [''],
      valorLoteFrom: [''],
      valorLoteTo: [''],
      dataEntradaFrom: [''],
      dataEntradaTo: [''],
    });
  }

  onSearch(): void {
    this.isLoading = true;
    this.pageIndex = 0;
    this.selectedLoteIds = [];
    this.updateButtonStates();
    const filtros: FiltrosPesquisa = this.filterForm.value;

    this.contabilService.pesquisarLotes(filtros, this.pageIndex, this.pageSize).subscribe({
      next: (resultado: ResultadoPesquisa): void => {
        this.tableData = resultado.lotes;
        this.totalResultados = resultado.total;
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log('Pesquisa concluída:', resultado);
      },
      error: (erro: unknown): void => {
        console.error('Erro na pesquisa:', erro);
        this.isLoading = false;
        this.tableData = [];
        this.totalResultados = 0;
        this.cdr.detectChanges();
      },
    });
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.selectedLoteIds = [];
    this.updateButtonStates();
    const filtros: FiltrosPesquisa = this.filterForm.value;

    this.contabilService.pesquisarLotes(filtros, this.pageIndex, this.pageSize).subscribe({
      next: (resultado: ResultadoPesquisa): void => {
        this.tableData = resultado.lotes;
        this.cdr.detectChanges();
      },
      error: (erro: unknown): void => {
        console.error('Erro ao carregar página:', erro);
        this.tableData = [];
        this.cdr.detectChanges();
      },
    });
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedLoteIds = this.tableData.map((lote: Lote) => lote.idLote);
    } else {
      this.selectedLoteIds = [];
    }
    this.updateButtonStates();
  }

  toggleSelectLote(idLote: number, event: any): void {
    if (event.target.checked) {
      if (!this.selectedLoteIds.includes(idLote)) {
        this.selectedLoteIds.push(idLote);
      }
    } else {
      this.selectedLoteIds = this.selectedLoteIds.filter((id: number) => id !== idLote);
    }
    this.updateButtonStates();
  }

  isLoteSelected(idLote: number): boolean {
    return this.selectedLoteIds.includes(idLote);
  }

  private updateButtonStates(): void {
    this.isAllSelected = this.tableData.length > 0 && this.selectedLoteIds.length === this.tableData.length;
    this.canAlterarExcluirVisualizar = this.selectedLoteIds.length === 1;
  }

  onConfirmar(): void {
    console.log('Confirmar');
  }

  onEnviar(): void {
    console.log('Enviar');
  }

  onVisualizarJustificativa(): void {
    console.log('Visualizar Justificativa');
  }

  onIncluir(): void {
    const dialogRef = this.dialog.open(EntryModalComponent, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe({
      next: (result: Lancamento | undefined): void => {
        if (result) {
          console.log('Lançamento criado:', result);
        }
      },
    });
  }

  onAlterar(): void {
    console.log('Alterar');
  }

  onExcluir(): void {
    console.log('Excluir');
  }

  onVisualizar(): void {
    console.log('Visualizar');
  }

}
