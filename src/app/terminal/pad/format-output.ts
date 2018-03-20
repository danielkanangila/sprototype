import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'format'})
export class FormatOutput implements PipeTransform {
    transform(value: string, inputType: string): string {
        switch (inputType) {
            case 'phone':
                return this.formatPhone(value);
            case 'amount':
                return this.formatAmount(value);
            case 'pin':
                return value;
            default:
                console.error('Input type is not specified.');
        }
    }

    formatPhone(value: string): string {
        if (value && value.length > 1) {
            const p = parseInt(value, 10);
            return '(0) ' + p.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1-');
        }
        return value;
    }

    formatAmount(value: string): string {
        if (value) {
            const a = +value;
            return a.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1 ');
        }
    }
}
