import { foldLeft } from "./utils";
// import { DataDescriptor, DetailDescriptor } from "./InterfaceCommonData";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

const USE_AXIOS: boolean = false

export default
class ServerCommunicator {
    protected headers: string[][] = []

    public addToHeader(headerRow: string[]) {
        this.headers.push(headerRow);
    }

    protected createFetchReqInit(method: string, body?: string) {
        this.headers.push([ 'Content-Type' , 'application/json' ]);

        const reqInit: RequestInit = {
            method: method,
            cache: 'no-cache',
            mode: 'cors',
            credentials: 'same-origin',
            headers: this.headers,
            redirect: 'follow',
            body: body
        };

        return reqInit;
    }

    protected createAxiosReqInit(method: Method) {
        this.headers.push([ 'Content-Type' , 'application/json' ]);

        let axiosHeader: any = {} 
        this.headers.forEach(item => {
            axiosHeader[item[0]] = item[1]
        })

        const reqInit: AxiosRequestConfig = {
            method: method,
            headers: axiosHeader,
            validateStatus: (status) => true,
        };

        return reqInit;
    }
    
    protected async checkFetchResultStatus(response: Response, okStatuses: number[] = [200]) {
        if (!okStatuses.includes(response.status)) {
            let message = `Error (${response.status} - ${response.statusText}")`;

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const json = await response.json();
                message += `: ${json["message"]}`;
            }

            throw new Error(message);
        }
    }

    protected async checkAxiosResultStatus(response: AxiosResponse, okStatuses: number[] = [200]) {
        if (!okStatuses.includes(response.status)) {
            let message = `Error (${response.status} - ${response.statusText}")`;

            const contentType = response.headers["content-type"];
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const json = await response.data;
                message += `: ${json["message"]}`;
            }

            throw new Error(message);
        }
    }

    public async getJson(url: string, params?: string[][]) {
        if (params) {
            const builder = (base: string, value: string[]) =>
                `${base}&${encodeURIComponent(value[0])}=${encodeURIComponent(value[1])}`

            let query = foldLeft(params, "")(builder)
            url = url + "?" + query.substr(1) // First '&' to '?'
        }

        let result: any

        if (USE_AXIOS) {
            
            const response = await axios.get(url, this.createAxiosReqInit("GET"))
            await this.checkAxiosResultStatus(response)
            //console.time("getjson")
            result = await response.data
            //console.timeEnd("getjson")
        }
        else
        {
            const response = await fetch(url, this.createFetchReqInit("GET"))
            await this.checkFetchResultStatus(response)
            result = await response.json()
        }

        return result
    }

    public async getObject<T>(url: string, jsonObjectName?: string, params?: string[][]) {
        const json = await this.getJson(url, params);
        if (jsonObjectName)
            return json[jsonObjectName] as T;
        else
            return json as T;
    }

    // public async getObjectExt<K>(url: string, jsonObjectName?: string, body?: DataDescriptor | DetailDescriptor) {
    //     const data = JSON.stringify(body)
    //     const json = await this.postJson(url, data);
    //     if (jsonObjectName)
    //         return json[jsonObjectName] as K;
    //     else
    //         return json as K;
    // }

    public async postJson(url: string, data: string) {
        let result: any

        //console.log("posting json", url, data)

        if (USE_AXIOS) {
            // console.time(`AXIOS1`)
            const response = await axios.post(url, data, this.createAxiosReqInit("POST"))
            // console.timeEnd(`AXIOS1`)
            // console.time(`AXIOS2`)
            await this.checkAxiosResultStatus(response, [200, 201])
            // console.timeEnd(`AXIOS2`)
            // console.time(`AXIOS3`)
            result = await response.data
            // console.timeEnd(`AXIOS3`)
        }
        else {
            // console.time(`AXIOS4`)
            const response = await fetch(url, this.createFetchReqInit("POST", data))
            // console.timeEnd(`AXIOS4`)
            // console.time(`AXIOS5`)
            await this.checkFetchResultStatus(response, [200, 201])
            // console.timeEnd(`AXIOS5`)
            // console.time(`AXIOS6`)
            result = await response.json()
            // console.timeEnd(`AXIOS6`)
        }

        return result
    }

    public async postObject<T, K>(url: string, obj: T, jsonObjectName: string) {
        const objToSend = {
            [jsonObjectName]: obj
        }
        const data = JSON.stringify(objToSend)
        let json = await this.postJson(url, data);
        
        return json as K;
    }

    public async postParamObject<R>(url: string, obj: object, jsonObjectName: string) {
        const data = JSON.stringify(obj)
        let json = await this.postJson(url, data);

        if (jsonObjectName) {
            return json[jsonObjectName] as R;
        } else {
            return json as R;
        }
    }

    public async putJson(url: string, data: string) {
        if (USE_AXIOS) {
            const response = await axios.put(url,  data, this.createAxiosReqInit("PUT"))
            return this.checkAxiosResultStatus(response, [200, 204, 304])
        }
        else {
            const response = await fetch(url, this.createFetchReqInit("PUT", data));
            return this.checkFetchResultStatus(response, [200, 204, 304]);
        }
    }

    public async putObject<T>(url: string, obj: T, jsonObjectName?: string) {
        let objToSend = jsonObjectName ? { [jsonObjectName]: obj } : obj
        const data = JSON.stringify(objToSend)
        return this.putJson(url, data);
    }

    public async putParamObject(url: string, obj: object, jsonObjectName?: string) {
        let objToSend = jsonObjectName ? { [jsonObjectName]: obj } : obj
        let data = JSON.stringify(objToSend)
        return this.putJson(url, data);
    }

    public async deleteJson(url: string) {
        if (USE_AXIOS) {
            const response = await axios.delete(url, this.createAxiosReqInit("DELETE"))
            return this.checkAxiosResultStatus(response, [200, 204])
        }
        else {
            const response = await fetch(url, this.createFetchReqInit("DELETE"));
            return this.checkFetchResultStatus(response, [200, 204]);
        }
    }

    public async deleteObject(url: string) {
        return this.deleteJson(url);
    }
}
