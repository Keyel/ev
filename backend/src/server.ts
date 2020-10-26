import * as express from 'express'
import {apiRouter} from './api'
import * as bodyParser from 'body-parser'
 
function loggerMiddleware(request: express.Request, response: express.Response, next: () => void) {
    console.log(`${request.method} ${request.path}`);
    next();
}

const app = express()

app.use(loggerMiddleware) //logolja a bejovo hivasokat
app.use(bodyParser.json()) //elerhetove teszi a jsonoket a bodyban (request.body neven)
app.use("/api", apiRouter) //regisztral egy routert az api pathra

app.get('/', (request, response) => {
    response.send('There is no static content at the moment, use the api instead!');
});
 
app.listen(5000, () => {
    console.log("Listening on 5000")
});