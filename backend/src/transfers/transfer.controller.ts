import { IController } from 'controller.base';
import * as express from 'express';
import { getFileNames } from '../utils';
import Transfer from './transfer.interface';
import { TransferModel } from './transfer.model';



class TransferController implements IController {
    public path = '/transfers';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllTransfers);
        this.router.post(this.path, this.createATransfer);
    }

    getAllTransfers = (request: express.Request, response: express.Response) => {
        const transfers = TransferModel.getSzamlaTortenet()

        //console.log(transfers)

        response.send(transfers);
    }

    createATransfer = (request: express.Request, response: express.Response) => {
        const transfer: Transfer = request.body;
        //this.transfers.push(transfer);
        response.send(transfer);
    }
}

export default TransferController;