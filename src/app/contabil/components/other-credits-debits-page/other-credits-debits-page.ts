import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Header } from "../../../shared/components/header/header";
import { ContabilService } from '../../service/contabil.service';
import { Lote, FiltrosPesquisa, ResultadoPesquisa } from '../../models/lote.model';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    Header,
  ],
  selector: 'app-other-credits-debits-page',
  styleUrl: './other-credits-debits-page.scss',
  templateUrl: './other-credits-debits-page.html',
})
export class OtherCreditsDebitsPage implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  situacaoOptions: Array<{ value: string; label: string }> = [
    { value: 'todas', label: 'Todas' },
    { value: 'aberto', label: 'Aberto' },
    { value: 'enviado', label: 'Enviado' },
    { value: 'confirmado', label: 'Confirmado' },
  ];

  constructor(
    private fb: FormBuilder,
    private contabilService: ContabilService,
    private cdr: ChangeDetectorRef
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
    const filtros: FiltrosPesquisa = this.filterForm.value;

    this.contabilService.pesquisarLotes(filtros, 0, 10).subscribe({
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
    console.log('Incluir');
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
