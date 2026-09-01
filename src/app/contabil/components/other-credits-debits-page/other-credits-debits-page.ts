import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Header } from "../../../shared/components/header/header";

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
  tableData: any[] = [];

  situacaoOptions = [
    { value: 'todas', label: 'Todas' },
    { value: 'aberto', label: 'Aberto' },
    { value: 'enviado', label: 'Enviado' },
    { value: 'confirmado', label: 'Confirmado' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTableData();
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

  loadTableData(): void {
    this.tableData = Array(10)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        idLote: i + 1,
        dataEntrada: '26/04/2026',
        valor: '1.000,00',
        quantLancamentos: '1',
        usuarioRegistro: 'gsarq0300_00',
        usuarioAprovacao: '-',
        situacaoLote: 'Aberto',
        dataHoraSituacao: '27/04/2026, 12:35:11',
      }));
  }

  onSearch(): void {
    console.log('Filtros aplicados:', this.filterForm.value);
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
