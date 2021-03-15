import React from 'react'
import { Table } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import Invoice from '../Interfaces/invoice.interface'
import DataProvider from '../Utils/DataProvicer'

export
const Invoices: React.FC = () => {
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

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Extra info:</Popover.Title>
            <Popover.Content>
                "Ez lesz a kovetkezo feladat, ide ki kell tenni a hozza tartozo utalasok infojat"
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
                { invoices.map(invoice => { return (
                    <tr>
                        <td>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                <Badge>{invoice.sorszam}</Badge>
                            </OverlayTrigger>
                        </td>
                        <td><Badge>{invoice.teljesites}</Badge> </td>
                        <td><Badge>{invoice.kelt}</Badge></td>
                        <td><Badge>{invoice.hatarido}</Badge></td>
                        <td style={{ textAlign:"right" }}><Badge variant= { invoice.amount > 150000 ? "primary" : "secondary"}>{invoice.amount}</Badge></td>
                        <td><Badge>{invoice.partner}</Badge></td>
                        <td><Badge>{invoice.leiras}</Badge></td>
                        <td style={{ textAlign:"right" }}><Badge variant= { invoice.tartozas ? "danger" : "success"}>{invoice.tartozas}</Badge></td>
                    </tr>
                )})}
            </tbody>
            </Table>            
        </div>
    )
}