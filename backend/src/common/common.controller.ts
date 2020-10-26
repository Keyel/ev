import { IController } from 'controller.base';
import * as express from 'express';

export
class CommonController implements IController {
    public path = '/';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get("/whoami", this.getWhoAmI);
        this.router.get("/hi", this.getHi)
    }

    getWhoAmI = (request: express.Request, response: express.Response) => {
        response.send( {
            router: "common",
            hostname: request.hostname,
            path: request.path,
            method: request.method
        })    
    }

    getHi = (request: express.Request, response: express.Response) => {
        response.send('Hello API Bandi!');
    }

}