import { Transfer } from "../transfers/transfer.interface";
import { TransferModel } from "../transfers/transfer.model";
import Invoice from "./invoice.interface";
import * as fs from 'fs'
import { getFileNames } from "../utils";


export
class InvoiceModel {

    
    private static getInvoicesFromFile(pathes: any[]) {
        const transfers = TransferModel.getSzamlaTortenet()

        return pathes.flatMap(path => {
            const file = fs.readFileSync(path, 'utf-8');
            // split the contents by new line
            const lines = file.split(/\r?\n/);
            const [header, ...dataLines] = lines;
            const invoices = dataLines.map(line => {
                const fields = line.split(/\t/);
                const [sorszam, teljesites, kelt, hatarido, amountStr, partner, leiras] = fields;
                const amount = parseInt(amountStr)

                
                const relatedTransfers: Transfer[] = transfers.flatMap(tr => {
                    const related = new RegExp(sorszam + '[a-zA-Z ü\.]')
                    return tr.kozlemeny === sorszam || related.test(tr.kozlemeny) ? tr : []
                    
                    // return tr.kozlemeny === sorszam || 
                    //         tr.kozlemeny.includes(sorszam+' ') || 
                    //         tr.kozlemeny.includes(sorszam+'.') || 
                    //         tr.kozlemeny.includes(sorszam+'szla')? tr : []
                })

                const sum = relatedTransfers.map(tr => tr.osszeg).reduce((a,b) => a+b, 0)

                return {
                    "sorszam": sorszam,
                    "teljesites": teljesites,
                    "kelt": kelt,
                    "hatarido": hatarido,
                    "amount": amount,
                    "partner": partner,
                    "leiras": leiras,
                    "tartozas": amount - sum,
                    
                    "relatedTransfers": relatedTransfers
                } as Invoice;
            });

            return invoices;
        });
    }

    public static getAllInvoices() {
        const pathes = getFileNames("invoices")
        const invoices = this.getInvoicesFromFile(pathes) 
    
        console.log(invoices)
    
        return invoices
    }


}