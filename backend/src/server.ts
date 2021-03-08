import { CommonController } from './common/common.controller';
import App from './app';
import InvoicesController from './invoices/invoice.controller';
import TransferController from './transfers/transfer.controller';
 

// https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/


const app = new App(
  [
    new InvoicesController(),
    new TransferController(),
    new CommonController()
  ],
  5000,
);
 
app.listen();
 

// const app = express()

// //app.use(loggerMiddleware) //logolja a bejovo hivasokat
// app.use(bodyParser.json()) //elerhetove teszi a jsonoket a bodyban (request.body neven)
// app.use("/api", apiRouter) //regisztral egy routert az api pathra

// app.get('/', (request, response) => {
//     response.send('There is no static content at the moment, use the api instead!');
// });
 
// app.listen(5000, () => {
//     console.log("Listening on 5000")
// });