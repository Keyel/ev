import * as express from 'express';
import { IController } from 'controller.base';
import * as cors from 'cors'

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
        this.app.use(cors())
        this.app.use(loggerMiddleware)
        this.app.use(express.json())
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