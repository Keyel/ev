import { IController } from 'controller.base';
import * as express from 'express';

import { AtalanyModel } from './atalany.model';



class AtalanyController implements IController {
    public path = '/atalany';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getMonths);
        // this.router.post(this.path, this.createATransfer);
    }

    getMonths = (request: express.Request, response: express.Response) => {

        const ret = AtalanyModel.getMonths()
        ret.reverse()
        response.send(ret);
    }
}

export default AtalanyController;