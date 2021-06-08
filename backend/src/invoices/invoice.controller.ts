import { IController } from 'controller.base';
import * as express from 'express';
import { getFileNames } from '../utils';
import Invoice from './invoice.interface';
import * as fs from 'fs'
import { TransferModel } from '../transfers/transfer.model';
import { Transfer } from '../transfers/transfer.interface';
import { InvoiceModel } from './invoice.model';


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
        const invoices = InvoiceModel.getAllInvoices()
        response.send(invoices);
    }

    createAnInvoice = (request: express.Request, response: express.Response) => {
        const invoice: Invoice = request.body;
        //this.invoices.push(invoice);
        response.send(invoice);
    }

}

export default InvoiceController;

// //tranzakcio_azon:invoice sorszam
// const relatedFix = {
//     "BNK21061DLDHLJDF" : "KL-2021-1"
// }