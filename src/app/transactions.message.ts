export function cashOutMessage(amount: string, ref: string, date: string): string {

    return `Cash out to ATM changed your balance
    Amount: ${amount},
    ref of transaction: ${ref.toUpperCase()},
    on ${date}`;
}

export function cashInMessage(amount: string, ref: string, date: string): string {
    return `Cash in from ATM changed your balance
    Amount: ${amount},
    ref of transaction: ${ref},
    on ${date}`;
}

