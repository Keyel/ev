import * as express from 'express';
 
export
const apiRouter = express.Router()

apiRouter.get('/', (request, response) => {
    response.send('Hello API world!');
});


