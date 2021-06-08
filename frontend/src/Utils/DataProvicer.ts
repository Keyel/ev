import { AtalanyHonap } from "../Interfaces/atalany.interface";
import Invoice from "../Interfaces/invoice.interface";
import Transfer from "../Interfaces/transfer.interface";
import ServerCommunicator from "./ServerCommunicator"

// const basicAuth = "tron_webui_api:213tuning123"

// function getUIServiceFullUrl(serviceUrl: string): string {
//     // return System.config<Config>().apiUIServerUrl + serviceUrl;
//     return `http://localhost:5000/` + serviceUrl
// }

function getDataServiceFullUrl(serviceUrl: string): string {
    // return System.config<Config>().apiDataServerUrl + serviceUrl;
    return `http://localhost:5000/api/` + serviceUrl
}


class DataServiceBase {
    server: ServerCommunicator;

    constructor() {
        this.server = new ServerCommunicator();       
        // this.server.addToHeader([ "MtUser", System.sessionId ]);
        // this.server.addToHeader([ 'Authorization', 'Basic ' + btoa(basicAuth) ]);
    }

    forceCacheReload() {
        this.server.addToHeader([ "cachepurge", "true" ]);
    }
}


class InvoiceProvider extends DataServiceBase {

    // public async get(_id: string) {
    //     const url = getDataServiceFullUrl("invoices/" + _id)
    //     return this.server.getObject<Panel>(url, "panel");
    // }

    public async getAll(params?: string[][]) {
        const url = getDataServiceFullUrl("invoices")
        return this.server.getObject<Invoice[]>(url, "", params);
    }

    // public async create(panel: PanelForSave) {
    //     const url = getDataServiceFullUrl("invoices")
    //     const tronId = await this.server.postObject<PanelForSave, TronId>(url, panel, "panel");
    //     return tronId._id;
    // }

    // public async update(panel: PanelForSave) {
    //     const url = getDataServiceFullUrl("invoices/" + panel._id)
    //     return this.server.putObject<PanelForSave>(url, panel, "panel");
    // }

    // public async delete(_id: string) {
    //     const url = getDataServiceFullUrl("invoices/" + _id)
    //     return this.server.deleteObject(url)
    // }
}

class TransferProvider extends DataServiceBase {
    public async getAll(params?: string[][]) {
        const url = getDataServiceFullUrl("transfers")
        return this.server.getObject<Transfer[]>(url, "", params);
    }
}

class AtalanyProvider extends DataServiceBase {
    public async getAll(params?: string[][]) {
        const url = getDataServiceFullUrl("atalany")
        return this.server.getObject<AtalanyHonap[]>(url, "", params);
    }
}



// class SessionProvider {
//     server: ServerCommunicator = new ServerCommunicator();

//     public async active() {
//         let url = "/api/client_utils/users/active"
//         let response = await this.server.getObject<TronSession>(url)

//         return response.active
//     }
// }

export default
class DataProvider {

    // public static get user(): UserProvider {
    //     return new UserProvider();
    // }

    public static get invoice(): InvoiceProvider {
        return new InvoiceProvider();
    }

    public static get transfer(): TransferProvider {
        return new TransferProvider();
    }

    public static get atalany(): AtalanyProvider {
        return new AtalanyProvider();
    }
    
    // // Session
    // public static get session(): SessionProvider {
    //     return new SessionProvider();
    // }
}
