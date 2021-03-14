interface Transfer {
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

export default Transfer;