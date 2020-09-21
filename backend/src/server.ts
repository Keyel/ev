import * as express from 'express';
import {apiRouter} from './api'
 
function loggerMiddleware(request: express.Request, response: express.Response, next) {
    console.log(`${request.method} ${request.path}`);
    next();
}

const app = express()

app.use(loggerMiddleware)
app.use("/api", apiRouter)

app.get('/', (request, response) => {
    response.send('There is no static content at the moment, use the api istead!');
});
 
app.listen(5000);