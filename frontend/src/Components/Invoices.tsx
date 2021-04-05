import React from 'react'
import { Table } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import Invoice from '../Interfaces/invoice.interface'
import DataProvider from '../Utils/DataProvicer'
import { Transfers } from './Transfers'

export
const Invoices = () => {
    const [invoices, setInvoices] = React.useState<Invoice[]>([])

    React.useEffect( () => {

        const load = async () => {
            const invs = await DataProvider.invoice.getAll()
            console.log(invs)
            setInvoices(invs)
        }

        load()
    }
    ,[])

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
                    <th>kelt</th>
                    <th>hatarido</th>
                    <th>amount</th>
                    <th>partner</th>
                    <th>leiras</th>
                    <th>tartozas</th>
                </tr>
            </thead>
            <tbody>
                { invoices.map(invoice => { 
                const formazott_osszeg = invoice.amount.toLocaleString("HU")
                const formazott_tartozas = invoice.tartozas.toLocaleString("HU")
                return (
                    <OverlayTrigger trigger="hover" placement = "auto" overlay={popover(invoice)}>
                    <tr>
                        <td><Badge>{invoice.sorszam}</Badge></td>
                        <td><Badge>{invoice.teljesites}</Badge></td>
                        <td><Badge>{invoice.kelt}</Badge></td>
                        <td><Badge>{invoice.hatarido}</Badge></td>
                        <td style={{ textAlign:"right" }}><Badge variant= { invoice.amount > 150000 ? "primary" : "secondary"}>{formazott_osszeg}</Badge></td>
                        <td><Badge>{invoice.partner}</Badge></td>
                        <td><Badge>{invoice.leiras}</Badge></td>
                        <td style={{ textAlign:"right" }}><Badge variant= { invoice.tartozas ? "danger" : "success"}>{formazott_tartozas}</Badge></td>
                    </tr>
                    </OverlayTrigger>
                )})}
            </tbody>
            </Table>            
        </div>
    )
}