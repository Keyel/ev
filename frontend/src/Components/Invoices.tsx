import React from 'react'
import { Table } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import Invoice from '../Interfaces/invoice.interface'
import DataProvider from '../Utils/DataProvicer'
import { Transfers } from './Transfers'

type InvoiceProps = {
    p_invoices?: Invoice[]
}

export
const Invoices = ({p_invoices} : InvoiceProps) => {
    const [invoices, setInvoices] = React.useState<Invoice[]>([])

    // if(p_invoices !== undefined) {
    //     setTransafers(p_invoices)
    // }

    React.useEffect( () => {

        if (p_invoices === undefined) {

            const load = async () => {
                const invs = await DataProvider.invoice.getAll()
                console.log(invs)
                setInvoices(invs)
            }    
            load()

        } else {
            setInvoices(p_invoices)
        }
    }
    ,[p_invoices])    
    
    const popover = (invoice: Invoice) => (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Related transfers:</Popover.Title>
            <Popover.Content >
                
                    <Transfers p_transfers = {invoice.relatedTransfers}/>
                    {/* { invoice.relatedTransfers.map ( transfer => {
                        return (
                            <>
                                "Transfer"
                            </>
                        )
                    })} */}

            </Popover.Content>
        </Popover>
    )

    return (
        <div>
            <Table striped bordered hover size="sm" /*variant="dark"*/>
            <thead>
                <tr>
                    <th>sorszam</th>
                    <th>teljesites</th>
                    {p_invoices === undefined && <th>kelt</th> }
                    {p_invoices === undefined && <th>hatarido</th> }
                    <th>netto</th>
                    <th>áfa</th>
                    {p_invoices === undefined && <th>partner</th> }
                    <th>leiras</th>
                    {p_invoices === undefined && <th>tartozas</th> }
                </tr>
            </thead>
            <tbody>
                { invoices.map(invoice => { 
                const formazott_osszeg = invoice.amount.toLocaleString("HU")
                const formazott_afa = invoice.afa.toLocaleString("HU")
                const formazott_tartozas = invoice.tartozas.toLocaleString("HU")
                return (
                    // <OverlayTrigger trigger="hover" placement = "auto" overlay={popover(invoice)}>
                    <tr>
                        <td><Badge>{invoice.sorszam}</Badge></td>
                        <td><Badge>{invoice.teljesites}</Badge></td>
                        {p_invoices === undefined && <td><Badge>{invoice.kelt}</Badge></td> }
                        {p_invoices === undefined && <td><Badge>{invoice.hatarido}</Badge></td>}
                        <OverlayTrigger trigger="hover" placement = "auto" overlay={popover(invoice)}>
                            <td style={{ textAlign:"right" }}><Badge variant= { invoice.amount > 150000 ? "primary" : "secondary"}>{formazott_osszeg}</Badge></td>
                        </OverlayTrigger>
                        {p_invoices === undefined && <td style={{ textAlign:"right" }}><Badge variant= { invoice.amount > 150000 ? "primary" : "secondary"}>{formazott_afa}</Badge></td>}
                        {p_invoices === undefined && <td><Badge>{invoice.partner}</Badge></td>}
                        <td><Badge>{invoice.leiras}</Badge></td>
                        {p_invoices === undefined && <td style={{ textAlign:"right" }}><Badge variant= { invoice.tartozas ? "danger" : "success"}>{formazott_tartozas}</Badge></td> }
                    </tr>
                    
                )})}
            </tbody>
            </Table>            
        </div>
    )
}