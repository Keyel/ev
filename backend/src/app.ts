import * as express from 'express';
import * as bodyParser from 'body-parser';
import { IController } from 'controller.base';

function loggerMiddleware(request: express.Request, response: express.Response, next: () => void) {
    console.log(`${request.method} ${request.path}`);
    next();
}

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: IController[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(loggerMiddleware)
        this.app.use(bodyParser.json())
    }

    private initializeControllers(controllers : IController[]) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;