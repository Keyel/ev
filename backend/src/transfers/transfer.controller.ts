import { IController } from 'controller.base';
import * as express from 'express';
import { getFileNames } from '../utils';
import { Transfer } from './transfer.interface';
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

    public respMemo = undefined
    getAllTransfers = (request: express.Request, response: express.Response) => {
        //if(this.respMemo === undefined) 
        {
            const transfers = TransferModel.getSzamlaTortenet().sort( (transfer1, transfer2) => transfer2.datum > transfer1.datum ? 1 : -1)
            this.respMemo = transfers
        }

        //console.log(transfers)

        response.send(this.respMemo);
    }

    createATransfer = (request: express.Request, response: express.Response) => {
        const transfer: Transfer = request.body;
        //this.transfers.push(transfer);
        response.send(transfer);
    }
}

export default TransferController;