import { IController } from 'controller.base';
import * as express from 'express';
import { getFileNames } from '../utils';
import Transfer from './transfer.interface';
import * as fs from 'fs'


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
        const pathes = getFileNames("szamlatortenet")
        const transfers = 
        this.getTransfersFromFile(pathes) 

        console.log(transfers)

        response.send(transfers);
    }

    createATransfer = (request: express.Request, response: express.Response) => {
        const transfer: Transfer = request.body;
        //this.transfers.push(transfer);
        response.send(transfer);
    }

    private getTransfersFromFile(pathes: any[]) {
        return pathes.flatMap(path => {
            const file = fs.readFileSync(path, 'utf-8');
            // split the contents by new line
            const lines = file.split(/\r?\n/);
            const [header, ...dataLines] = lines;
            const transfers = dataLines.map(line => {
                const fields = line.split(/\t/);
                const [konyvelesDatuma, tranzakcioAzon, tipus, konyvelesiSzamla, konyvelesiSzamlaNeve, partnerSzamla, partnerNev, osszeg, deviza, kozlemeny] = fields;
                return {
                    konyvelesDatuma: konyvelesDatuma,
                    tranzakcioAzon: tranzakcioAzon,
                    tipus: tipus,
                    konyvelesiSzamla: konyvelesiSzamla,
                    konyvelesiSzamlaNeve: konyvelesiSzamlaNeve,
                    partnerSzamla: partnerSzamla,
                    partnerNev: partnerNev,
                    osszeg: osszeg,
                    deviza: deviza,
                    kozlemeny: kozlemeny,
                } as Transfer;
            });

            return transfers;
        });
    }
}

export default TransferController;