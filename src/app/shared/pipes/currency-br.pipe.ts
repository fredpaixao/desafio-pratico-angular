import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBr',
  standalone: true,
})
export class CurrencyBrPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';

    const numericValue: number = typeof value === 'string'
      ? parseFloat(value.replace(/\./g, '').replace(',', '.'))
      : value;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue);
  }
}
