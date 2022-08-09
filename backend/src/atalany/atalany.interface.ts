import Invoice from "invoices/invoice.interface";
import { Transfer } from "transfers/transfer.interface";

export
interface AtalanyHonap {
    honap: string, //2021-06
    invoices: Invoice[],
    
    bevetel: number,
    jovedelem: number,
    minimumApplied: boolean,
    
    szocho: number,
    tbj: number,
    szja: number,
    afa: number,
}
