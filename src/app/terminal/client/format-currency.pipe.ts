import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toCurrency'})
export class FormatCurrency implements PipeTransform {
    transform(value: number, symbol: string): string {
        return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ` ${symbol}`;
    }
}
