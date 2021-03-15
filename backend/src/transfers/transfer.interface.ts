export 
interface BankTransfer {
    konyvelesDatuma: string,
    tranzakcioAzon: string,
    tipus: string,
    konyvelesiSzamla: string,
    konyvelesiSzamlaNeve: string,
    partnerSzamla: string,
    partnerNev: string,
    osszeg: number,
    deviza: string,
    kozlemeny: string
}

export
interface Transfer {
    datum: string,
    tipus: string,
    from: string,
    to: string,
    osszeg: number,
    kozlemeny: string
}


