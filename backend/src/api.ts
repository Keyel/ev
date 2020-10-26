import * as express from 'express';
 
export
const apiRouter = express.Router()

apiRouter.get('/hi', (request, response) => {
    response.send('Hello API Bandi!');
});

apiRouter.get('/whoami', (request, response) => {
    response.send( {
        router: "api",
        hostname: request.hostname,
        path: request.path,
        method: request.method
    });
});

apiRouter.post('/', (request, response) => {
    response.send(request.body);
});



