import React from 'react'
import { OverlayTrigger, Popover, Table } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
// import { Popover } from 'react-bootstrap'
// import { OverlayTrigger } from 'react-bootstrap'
import { AtalanyHonap } from '../Interfaces/atalany.interface'
// import Invoice from '../Interfaces/invoice.interface'
import DataProvider from '../Utils/DataProvicer'
import { Invoices } from './Invoices'
// import { Transfers } from './Transfers'
import '../index.css';

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

    const popover = (honap: AtalanyHonap) => (
        <Popover id="popover-basic" >
            <Popover.Title as="h3">Related transfers:</Popover.Title>
            <Popover.Content>
                <Invoices p_invoices = {honap.invoices}/>
            </Popover.Content>
        </Popover>
    )

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
                    <th>szocho 258</th>
                    <th>tbj 406</th>
                    <th>szja 103</th>
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

                    // eslint-disable-next-line
                    const [_, m] = honap.split("-")
                    
                    const negyedev = ((parseInt(m) - 1) / 3) >> 0
                    const alpha = negyedev / 10
                    const rowStyle = { backgroundColor : `rgba(155, 155, 155, ${alpha})` }

                return (
                    <tr style = {rowStyle}>
                        <td style={{ textAlign:"center" }}><Badge>{honap}</Badge></td> 
                        <td style={{ textAlign:"right" }}><Badge>{bevetel}</Badge></td> 
                        <OverlayTrigger trigger="hover" placement = "auto" overlay={popover(month)}>
                            <td style={{ textAlign:"right" }}><Badge variant= { minimumApplied ? "danger" : "success"} >{jovedelem}</Badge></td> 
                        </OverlayTrigger>
                        <td style={{ textAlign:"right" }}><Badge>{szocho}</Badge></td> 
                        <td style={{ textAlign:"right" }}><Badge>{tbj}</Badge></td> 
                        <td style={{ textAlign:"right" }}><Badge>{szja}</Badge></td> 
                    </tr>
                )})}
            </tbody>
            </Table>            
        </div>
    )
}