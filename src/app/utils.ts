export class Utils {
    formatAmount(a: number): string {
        return a.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
}
