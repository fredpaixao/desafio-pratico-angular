import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ContabilService, OptionValue } from '../../service/contabil.service';
import { Lancamento, ContaCorrente, Anexo } from '../../models/lote.model';

@Component({
  selector: 'app-entry-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './entry-modal.component.html',
  styleUrl: './entry-modal.component.scss',
})
export class EntryModalComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  entryForm!: FormGroup;
  contaSelecionada: ContaCorrente | null = null;
  contasSearchResults: ContaCorrente[] = [];
  showSearchResults: boolean = false;
  historicosOptions: OptionValue[] = [];
  paOptions: OptionValue[] = [];
  anexos: Anexo[] = [];
  displayedColumnsAnexos: string[] = ['nomeReduzido', 'descricao', 'dataInclusao', 'idUsuario'];

  constructor(
    private fb: FormBuilder,
    private contabilService: ContabilService,
    public dialogRef: MatDialogRef<EntryModalComponent>,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.carregarOpcoes();
  }

  private carregarOpcoes(): void {
    this.contabilService.obterHistoricos().subscribe({
      next: (historicos: OptionValue[]): void => {
        this.historicosOptions = historicos;
      },
    });

    this.contabilService.obterPA().subscribe({
      next: (pa: OptionValue[]): void => {
        this.paOptions = pa;
      },
    });
  }

  initializeForm(): void {
    this.entryForm = this.fb.group({
      contaCorrente: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      historico: ['', Validators.required],
      estorno: [false],
      documento: ['', Validators.required],
      descricao: [''],
      situacao: ['Pendente'],
      pa: ['', Validators.required],
      idEvento: [''],
      complHistorico: [''],
      situacaoCsc: ['Aguardando Processamento CCO'],
      idDocCsc: [''],
    });
  }

  onContaSearch(termo: string): void {
    if (!termo || termo.length < 1) {
      this.showSearchResults = false;
      return;
    }

    this.contabilService.buscarContasCorrentes(termo).subscribe({
      next: (contas: ContaCorrente[]): void => {
        this.contasSearchResults = contas;
        this.showSearchResults = contas.length > 0;
      },
      error: (erro: unknown): void => {
        console.error('Erro ao buscar contas:', erro);
        this.contasSearchResults = [];
        this.showSearchResults = false;
      },
    });
  }

  selectContaCorrente(conta: ContaCorrente): void {
    this.contaSelecionada = conta;
    this.entryForm.patchValue({ contaCorrente: conta.numero });
    this.showSearchResults = false;
    this.contasSearchResults = [];
  }

  clearContaCorrente(): void {
    this.contaSelecionada = null;
    this.entryForm.patchValue({ contaCorrente: '' });
    this.showSearchResults = false;
    this.contasSearchResults = [];
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.entryForm.valid || !this.contaSelecionada) {
      return;
    }

    const lancamento: Lancamento = {
      id: 0,
      contaCorrente: this.contaSelecionada,
      valor: parseFloat(this.entryForm.value.valor),
      historico: this.entryForm.value.historico,
      estorno: this.entryForm.value.estorno,
      documento: this.entryForm.value.documento,
      descricao: this.entryForm.value.descricao,
      situacao: 'Pendente',
      pa: this.entryForm.value.pa,
      idEvento: this.entryForm.value.idEvento,
      complHistorico: this.entryForm.value.complHistorico,
      situacaoCsc: 'Aguardando Processamento CCO',
      idDocCsc: this.entryForm.value.idDocCsc,
    };

    this.dialogRef.close(lancamento);
  }

  isFormValid(): boolean {
    return this.entryForm.valid && this.contaSelecionada !== null;
  }

  getFieldError(fieldName: string): string {
    const control = this.entryForm.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'Campo obrigatório';
    }
    if (control.errors['min']) {
      return 'Valor deve ser positivo (mínimo 0.01)';
    }
    if (control.errors['pattern']) {
      return 'Formato inválido';
    }

    return '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const arquivo: File = input.files[0];
      const hoje: Date = new Date();
      const dataInclusao: string = `${hoje.toLocaleDateString('pt-BR')} ${hoje.toLocaleTimeString('pt-BR')}`;

      const anexo: Anexo = {
        id: Date.now(),
        nomeReduzido: arquivo.name.substring(0, 50),
        descricao: '-',
        dataInclusao: dataInclusao,
        idUsuario: 'user_001',
      };

      this.anexos.push(anexo);
      console.log('Anexo adicionado:', anexo);
      input.value = '';
    }
  }

  onVisualizarAnexo(): void {
    console.log('Visualizar Anexo');
  }

  onIncluirAnexo(): void {
    this.fileInput.nativeElement.click();
  }

  onExcluirAnexo(): void {
    if (this.anexos.length > 0) {
      this.anexos.pop();
      console.log('Último anexo removido');
    }
  }
}
