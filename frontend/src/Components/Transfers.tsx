import React from 'react'
import { Table } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import Invoice from '../Interfaces/invoice.interface'
import Transfer from '../Interfaces/transfer.interface'
import DataProvider from '../Utils/DataProvicer'

export
const Transfers: React.FC = () => {
    const [transfers, setTransafers] = React.useState<Transfer[]>([])

    React.useEffect( () => {

        const load = async () => {
            const tr = await DataProvider.transfer.getAll()
            console.log(tr)
            setTransafers(tr)
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
            <Table responsive striped bordered hover size="sm" /*variant="dark"*/>
            <thead>
                <tr>
                    <th>datum</th>
                    {/* <th>tranzakcioAzon</th> */}
                    <th>tipus</th>
                    {/* <th>konyvelesiSzamla</th> */}
                    <th >from</th>
                    {/* <th>partnerSzamla</th> */}
                    <th>to</th>
                    <th>osszeg</th>
                    {/* <th>deviza</th> */}
                    <th>kozlemeny</th>
                </tr>
            </thead>
            <tbody>
                { transfers.map(transfer => { return (
                    <tr>
                        <td><Badge>{transfer.datum}</Badge> </td>
                        {/* <td><Badge>{transfer.tranzakcioAzon}</Badge> </td> */}
                        <td><Badge>{transfer.tipus}</Badge> </td>
                        {/* <td><Badge>{transfer.konyvelesiSzamla}</Badge> </td> */}
                        <td><Badge>{transfer.from}</Badge> </td>
                        {/* <td><Badge>{transfer.partnerSzamla}</Badge> </td> */}
                        <td><Badge>{transfer.to}</Badge> </td>
                        <td style={{ textAlign:"right" }}><Badge variant= { 
                            transfer.from.includes("INFO") ? "info" : 
                            transfer.to.includes("NAV") || transfer.to.includes("APEH")? "warning" 
                            : ""
                        }>{transfer.osszeg}</Badge></td>
                        {/* <td><Badge>{transfer.deviza}</Badge> </td> */}
                        <td><Badge>{transfer.kozlemeny}</Badge> </td>
                    </tr>
                )})}
            </tbody>
            </Table>            
        </div>
    )
}