import { response } from "express"
import Invoice from "../invoices/invoice.interface"
import { InvoiceModel } from "../invoices/invoice.model"
import { getMonthFirstDay, incMonth, atalanyFrom } from "../utils"
import { AtalanyHonap } from "./atalany.interface"
import * as dayjs from 'dayjs'


export
class AtalanyModel {
    public static getMonths = () => {

        const invoices = InvoiceModel.getAllInvoices()
        // const atalanyInvoices = invoices.filter(invoice => invoice.teljesites >= '2021.06.01' )

        //atalanyadozas kezdete
        const firstMonth = atalanyFrom

        //const firstMonth = new Date('2019-01-01')
        
        let thisMonth = getMonthFirstDay(new Date())
        const lastMonth = incMonth(thisMonth)
        
        
        let months: Date[] = [] 
        let month = firstMonth
        while(month < lastMonth) {
            months.push(month)
            month = incMonth(month)
        }

        const garantaltBerminimum = 219000
        const szochoAlapMinimumSzorzo = 112.5 / 100
        const szochoAdoSzorzo = (month: Date) => {
            if (month < new Date(2022,1,1)) 
                return 15.5 / 100
            else 
                return 13 / 100
        }
        const tbjAdoSzorzo = 18.5 / 100
        const atalanySzorzo = 1 - 0.4
        const szjaAdoSzorzo = 15 / 100

        const minSzochoAlap = garantaltBerminimum * szochoAlapMinimumSzorzo ;
        const minTbjAlap = garantaltBerminimum 

        const ret: AtalanyHonap[] = months.map( month =>  {

            const relatedInvoices: Invoice[] = invoices.flatMap(invoice => {
                const nextMonth = incMonth(month)
                const telj = new Date(invoice.teljesites)
                const related = month <= telj && telj < nextMonth

                return related ? invoice : []                
            })

            const bevetel = relatedInvoices.map(inv => inv.amount).reduce((a,b) => a+b, 0)
            const jovedelem = bevetel * atalanySzorzo
            
            const jovedelemSzocho = jovedelem * szochoAdoSzorzo(month)
            const jovedelemTbj = jovedelem * tbjAdoSzorzo

            const minimumApplied = jovedelem < minSzochoAlap           
            const szocho = Math.max(jovedelem, minSzochoAlap) * szochoAdoSzorzo(month)
            const tbj = Math.max(jovedelem, minTbjAlap) * tbjAdoSzorzo

            const szja = jovedelem * szjaAdoSzorzo

            const afa = relatedInvoices.map(inv => inv.afa).reduce((a,b) => a+b, 0)


            return {

                honap: `${month.getFullYear()}-${month.getMonth() + 1}`,
                invoices: relatedInvoices,
                
                bevetel: bevetel,
                jovedelem: jovedelem,
                minimumApplied: minimumApplied,
                
                szocho: szocho,
                tbj: tbj,
                szja: szja,
                afa: afa

            } as AtalanyHonap
        })

        return ret
    }    
}