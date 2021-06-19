import React from 'react'
import { Table } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import { AtalanyHonap } from '../Interfaces/atalany.interface'
import Invoice from '../Interfaces/invoice.interface'
import DataProvider from '../Utils/DataProvicer'
import { Transfers } from './Transfers'

export
const AtalanyHonapok = () => {
    const [atalanyMonths, setAtalanyMonths] = React.useState<AtalanyHonap[]>([])

    React.useEffect( () => {

        const load = async () => {
            const months = await DataProvider.atalany.getAll()
            console.log(months)
            setAtalanyMonths(months)
        }

        load()
    }
    ,[])

    // const popover = (invoice: Invoice) => (
    //     <Popover id="popover-basic">
    //         <Popover.Title as="h3">Related transfers:</Popover.Title>
    //         <Popover.Content >
    //             <Transfers p_transfers = {invoice.relatedTransfers}/>
    //             {/* { invoice.relatedTransfers.map ( transfer => {
    //                 return (
    //                     <>
    //                         "Transfer"
    //                     </>
    //                 )
    //             })} */}
    //         </Popover.Content>
    //     </Popover>
    // )

    // const colors = []

    return (
        <div>
            <Table striped bordered hover size="sm" /*variant="dark"*/>
            <thead>
                <tr style={{ textAlign:"center" }}>
                    <th>honap</th>
                    <th>bevetel</th>
                    <th>jovedelem</th>
                    {/* <th>minimumApplied</th> */}
                    <th>szocho</th>
                    <th>tbj</th>
                    <th>szja</th>
                </tr>
            </thead>
            <tbody>
                { atalanyMonths.map(month => { 
                // const formazott_osszeg = invoice.amount.toLocaleString("HU")
                // const formazott_tartozas = invoice.tartozas.toLocaleString("HU")

                    const honap = month.honap
                    const bevetel = month.bevetel.toLocaleString("HU")
                    const jovedelem = month.jovedelem.toLocaleString("HU")
                    const minimumApplied = month.minimumApplied
                    const szocho = month.szocho.toLocaleString("HU")
                    const tbj = month.tbj.toLocaleString("HU")
                    const szja = month.szja.toLocaleString("HU")

                    const [_, m] = honap.split("-")
                    const negyedev = ((parseInt(m-1) / 3) >> 0)
                    const alpha = negyedev / 10
                    const rowStyle = { backgroundColor : `rgba(155, 155, 155, ${alpha})` }

                return (
                    // <OverlayTrigger trigger="hover" placement = "auto" overlay={popover(invoice)}>
                    <tr style = {rowStyle}>
                        <td style={{ textAlign:"center" }}><Badge>{honap}</Badge></td> 
                        <td style={{ textAlign:"right" }}><Badge>{bevetel}</Badge></td> 
                        <td style={{ textAlign:"right" }}><Badge variant= { minimumApplied ? "danger" : "success"} >{jovedelem}</Badge></td> 
                        <td style={{ textAlign:"right" }}><Badge>{szocho}</Badge></td> 
                        <td style={{ textAlign:"right" }}><Badge>{tbj}</Badge></td> 
                        <td style={{ textAlign:"right" }}><Badge>{szja}</Badge></td> 
                    </tr>
                    // </OverlayTrigger>
                )})}
            </tbody>
            </Table>            
        </div>
    )
}