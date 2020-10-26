import { IController } from 'controller.base';
import * as express from 'express';
import { getFileNames } from '../utils';
import Invoice from './invoice.interface';
import * as fs from 'fs'


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
        return pathes.flatMap(path => {
            const file = fs.readFileSync(path, 'utf-8');
            // split the contents by new line
            const lines = file.split(/\r?\n/);
            const [header, ...dataLines] = lines;
            const invoices = dataLines.map(line => {
                const fields = line.split(/\t/);
                const [sorszam, teljesites, kelt, hatarido, amount, partner, leiras] = fields;
                return {
                    "sorszam": sorszam,
                    "teljesites": teljesites,
                    "kelt": kelt,
                    "hatarido": hatarido,
                    "amount": amount,
                    "partner": partner,
                    "leiras": leiras,
                } as Invoice;
            });

            return invoices;
        });
    }
}

export default InvoiceController;