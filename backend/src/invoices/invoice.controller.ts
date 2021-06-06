import { IController } from 'controller.base';
import * as express from 'express';
import { getFileNames } from '../utils';
import Invoice from './invoice.interface';
import * as fs from 'fs'
import { TransferModel } from '../transfers/transfer.model';
import { Transfer } from '../transfers/transfer.interface';


class InvoiceController implements IController {
    public path = '/invoices';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllInvoices);
        this.router.post(this.path, this.createAnInvoice);
    }

    getAllInvoices = (request: express.Request, response: express.Response) => {
        const pathes = getFileNames("invoices")
        const invoices = 
        this.getInvoicesFromFile(pathes) 

        console.log(invoices)

        response.send(invoices);
    }

    createAnInvoice = (request: express.Request, response: express.Response) => {
        const invoice: Invoice = request.body;
        //this.invoices.push(invoice);
        response.send(invoice);
    }

    private getInvoicesFromFile(pathes: any[]) {
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
}

export default InvoiceController;

// //tranzakcio_azon:invoice sorszam
// const relatedFix = {
//     "BNK21061DLDHLJDF" : "KL-2021-1"
// }