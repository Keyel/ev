interface Transfer {
    konyvelesDatuma: String,
    tranzakcioAzon: String,
    tipus: String,
    konyvelesiSzamla: String,
    konyvelesiSzamlaNeve: String,
    partnerSzamla: String,
    partnerNev: String,
    osszeg: number,
    deviza: String,
    kozlemeny: String
}

export default Transfer;