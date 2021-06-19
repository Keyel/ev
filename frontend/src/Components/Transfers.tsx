import React from 'react'
import { Table } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import Transfer from '../Interfaces/transfer.interface'
import DataProvider from '../Utils/DataProvicer'

type TransferProps = {
    p_transfers?: Transfer[]
}

export
const Transfers = ( {p_transfers} : TransferProps ) => {
    const [transfers, setTransafers] = React.useState<Transfer[]>([])

    // if(p_transfers !== undefined) {
    //     setTransafers(p_transfers)
    // }

    React.useEffect( () => {

        if (p_transfers === undefined) {

            const load = async () => {
                const tr = await DataProvider.transfer.getAll()
                console.log(tr)
                setTransafers(tr)
            }
    
            load()

        } else {
            setTransafers(p_transfers)
        }
    }
    ,[p_transfers])

    const popover = (transfer: Transfer) => (
        <div style={{backgroundColor:"lightcoral"}}>
            { JSON.stringify(transfer, null, "\n") }
        </div>
    )

    // const popover = (transfer: Transfer) => (
    //     <Popover id="popover-basic">
    //         <Popover.Title as="h3">Extra info:</Popover.Title>
    //         <Popover.Content>
    //             {/* <b> */}
    //                 {JSON.stringify(transfer, null, "\n")}
    //             {/* </b> */}
                
    //         </Popover.Content>
    //     </Popover>
    // )

    return (

        <div>
            <Table responsive striped bordered hover size="sm" /*variant="dark"*/>
            <thead>
                {p_transfers === undefined && 
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
                }
            </thead>
            <tbody>
                { transfers.map(transfer => { 
                    const formazott_osszeg = transfer.osszeg.toLocaleString("HU")
                    return ( 
                    // <OverlayTrigger key = {transfer.kozlemeny} trigger="hover" placement = "auto" overlay = { popover (transfer) }>
                    
                    <tr>
                        {p_transfers === undefined &&
                            <OverlayTrigger trigger="hover" placement = "auto" overlay = { popover (transfer) }>
                                <td><Badge>{transfer.datum}</Badge> </td> 
                            </OverlayTrigger> 
                        }
                        {p_transfers === undefined && <td><Badge>{transfer.tipus}</Badge> </td> }
                        {p_transfers === undefined && <td><Badge>{transfer.from}</Badge> </td> }
                        {p_transfers === undefined && <td><Badge>{transfer.to}</Badge> </td> }
                        
                        <td style={{ textAlign:"right" }}><Badge variant= { 
                            transfer.from.includes("INFO") ? "info" : 
                            transfer.to.includes("NAV") || transfer.to.includes("APEH")? "dark" :
                            transfer.to.includes("kamara") || transfer.to.includes("kormányzat") ? "secondary" : ""
                        }>{formazott_osszeg}</Badge></td>
                        
                        <td><Badge>{transfer.kozlemeny}</Badge> </td>
                    </tr>
                    
                )})}
            </tbody>
            </Table>
        </div>
    )
}


                        // {/* <td><Badge>{transfer.tranzakcioAzon}</Badge> </td> */}
                        // {/* <td><Badge>{transfer.konyvelesiSzamla}</Badge> </td> */}
                        // {/* <td><Badge>{transfer.partnerSzamla}</Badge> </td> */}
                        // {/* <td><Badge>{transfer.deviza}</Badge> </td> */}
