import Transfer from "./transfer.interface";

interface Invoice {
    sorszam: string
    teljesites: string
    kelt: string
    hatarido: string
    amount: number
    partner: string
    leiras: string

    tartozas: number,
    relatedTransfers: Transfer[]
}

export default Invoice; 