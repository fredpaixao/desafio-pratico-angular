import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Header } from "../../../shared/components/header/header.component";
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { FilterPanelComponent } from '../../../shared/components/filter-panel/filter-panel.component';
import { DataTableComponent, ColumnConfig } from '../../../shared/components/data-table/data-table.component';
import { EntryModalComponent } from '../entry-modal/entry-modal.component';
import { ContabilService } from '../../service/contabil.service';
import { Lote, FiltrosPesquisa, ResultadoPesquisa, Lancamento } from '../../models/lote.model';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    Header,
    PaginationComponent,
    FilterPanelComponent,
    DataTableComponent,
  ],
  selector: 'app-other-credits-debits-page',
  styleUrl: './other-credits-debits-page.component.scss',
  templateUrl: './other-credits-debits-page.component.html',
})
export class OtherCreditsDebitsPage implements OnInit {
  filterForm!: FormGroup;

  tableData: Lote[] = [];
  isLoading: boolean = false;
  totalResultados: number = 0;
  selectedLotes: Lote[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;

  tableColumns: ColumnConfig[] = [
    { key: 'idLote', label: 'ID Lote', type: 'number' },
    { key: 'dataEntrada', label: 'Data Entrada', type: 'text' },
    { key: 'valor', label: 'Valor', type: 'currency' },
    { key: 'quantLancamentos', label: 'Quant. Lançamentos', type: 'number' },
    { key: 'usuarioRegistro', label: 'Usuário Registro', type: 'text' },
    { key: 'usuarioAprovacao', label: 'Usuário Aprovação', type: 'text' },
    { key: 'situacaoLote', label: 'Situação Lote', type: 'text' },
    { key: 'dataHoraSituacao', label: 'Data/Hora Situação', type: 'text' },
  ];

  displayColumns: string[] = [
    'idLote',
    'dataEntrada',
    'valor',
    'quantLancamentos',
    'usuarioRegistro',
    'usuarioAprovacao',
    'situacaoLote',
    'dataHoraSituacao',
  ];

  canAlterarExcluirVisualizar: boolean = false;
  canConfirmar: boolean = true;
  canEnviar: boolean = true;
  canVisualizarJustificativa: boolean = true;
  canIncluir: boolean = true;
  currentFiltros: any = {};

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
    private dialog: MatDialog,
    private ngZone: NgZone,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.filterForm = this.fb.group(
      {
        instituicaoResp: [''],
        instituicao: [''],
        situacaoLote: ['todas'],
        idLoteFrom: ['', [Validators.min(1)]],
        idLoteTo: ['', [Validators.min(1)]],
        valorLoteFrom: ['', [Validators.min(0)]],
        valorLoteTo: ['', [Validators.min(0)]],
        dataEntradaFrom: [''],
        dataEntradaTo: [''],
      },
      {
        validators: [
          this.rangeValidator('idLoteFrom', 'idLoteTo'),
          this.rangeValidator('valorLoteFrom', 'valorLoteTo'),
          this.dateRangeValidator('dataEntradaFrom', 'dataEntradaTo'),
        ],
      }
    );
  }

  private rangeValidator(fromField: string, toField: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const fromControl = group.get(fromField);
      const toControl = group.get(toField);

      if (!fromControl || !toControl) {
        return null;
      }

      const fromValue = fromControl.value;
      const toValue = toControl.value;

      if (fromValue && !toValue) {
        toControl.setErrors({ required: true });
        return { rangeIncomplete: true };
      }

      if (!fromValue && toValue) {
        fromControl.setErrors({ required: true });
        return { rangeIncomplete: true };
      }

      if (fromValue && toValue && parseFloat(fromValue) > parseFloat(toValue)) {
        toControl.setErrors({ rangeInvalid: true });
        return { rangeInvalid: true };
      }

      if (!fromValue && !toValue) {
        fromControl.setErrors(null);
        toControl.setErrors(null);
      }

      return null;
    };
  }

  private dateRangeValidator(fromField: string, toField: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const fromControl = group.get(fromField);
      const toControl = group.get(toField);

      if (!fromControl || !toControl) {
        return null;
      }

      const fromValue = fromControl.value;
      const toValue = toControl.value;

      if (fromValue && !toValue) {
        toControl.setErrors({ required: true });
        return { dateRangeIncomplete: true };
      }

      if (!fromValue && toValue) {
        fromControl.setErrors({ required: true });
        return { dateRangeIncomplete: true };
      }

      if (fromValue && toValue && new Date(fromValue) > new Date(toValue)) {
        toControl.setErrors({ dateRangeInvalid: true });
        return { dateRangeInvalid: true };
      }

      if (!fromValue && !toValue) {
        fromControl.setErrors(null);
        toControl.setErrors(null);
      }

      return null;
    };
  }

  getFieldError(fieldName: string): string {
    const control = this.filterForm.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'Campo obrigatório quando o início está preenchido';
    }
    if (control.errors['min']) {
      return `Valor deve ser positivo (mínimo ${fieldName.includes('idLote') ? '1' : '0'})`;
    }
    if (control.errors['rangeInvalid']) {
      return 'O valor "até" não pode ser menor que "de"';
    }
    if (control.errors['dateRangeInvalid']) {
      return 'A data "até" não pode ser menor que a data "de"';
    }

    return '';
  }

  onSearch(): void {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.pageIndex = 0;
    this.selectedLotes = [];
    const filtros: any = this.filterForm.value;
    this.currentFiltros = filtros;

    this.contabilService.pesquisarLotes(filtros, this.pageIndex, this.pageSize).subscribe({
      next: (resultado: ResultadoPesquisa): void => {
        this.ngZone.run(() => {
          this.tableData = resultado.lotes;
          this.totalResultados = resultado.total;
          this.isLoading = false;
          this.cdr.detectChanges();
          console.log('Pesquisa concluída:', resultado);
        });
      },
      error: (erro: unknown): void => {
        this.ngZone.run(() => {
          console.error('Erro na pesquisa:', erro);
          this.isLoading = false;
          this.tableData = [];
          this.totalResultados = 0;
          this.cdr.detectChanges();
        });
      },
    });
  }

  onClearFilters(): void {
    this.filterForm.reset({
      situacaoLote: 'todas',
    });
    this.tableData = [];
    this.totalResultados = 0;
    this.selectedLotes = [];
  }


  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.selectedLotes = [];

    this.contabilService.pesquisarLotes(this.currentFiltros, this.pageIndex, this.pageSize).subscribe({
      next: (resultado: ResultadoPesquisa): void => {
        this.ngZone.run(() => {
          this.tableData = resultado.lotes;
          this.cdr.detectChanges();
        });
      },
      error: (erro: unknown): void => {
        this.ngZone.run(() => {
          console.error('Erro ao carregar página:', erro);
          this.tableData = [];
          this.cdr.detectChanges();
        });
      },
    });
  }

  onTableSelectionChange(selectedLotes: Lote[]): void {
    this.selectedLotes = selectedLotes;
    this.canAlterarExcluirVisualizar = selectedLotes.length === 1;
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
    if (this.selectedLotes.length === 1) {
      const loteId = this.selectedLotes[0].idLote;
      this.router.navigate([`/contabil/lotes/${loteId}`], { queryParams: { incluir: 'true' } });
    }
  }

  onAlterar(): void {
    console.log('Alterar');
  }

  onExcluir(): void {
    console.log('Excluir');
  }

  onVisualizar(): void {
    if (this.selectedLotes.length === 1) {
      const loteId = this.selectedLotes[0].idLote;
      this.router.navigate([`/contabil/lotes/${loteId}`]);
    }
  }

}
