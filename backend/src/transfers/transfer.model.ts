import { getFileNames } from "../utils";
import { BankTransfer, Transfer } from "./transfer.interface";
import * as fs from 'fs'

export
class TransferModel {

    static memo = {}

    private static getTransfersFromFile(pathes: any[]) {
        return pathes.flatMap(path => {
            // if( this.memo.hasOwnProperty(path) ) {
            //     return this.memo[path]
            // }

            const file = fs.readFileSync(path, 'utf-8');
            // split the contents by new line
            const lines = file.split(/\r?\n/);
            const [header, ...dataLines] = lines;
            const transfers : BankTransfer[] = dataLines.flatMap(line => {
                const fields = line.split(/\t/);
                const [konyvelesDatuma, tranzakcioAzon, tipus, konyvelesiSzamla, konyvelesiSzamlaNeve, partnerSzamla, partnerNev, osszegStr, deviza, kozlemeny] = fields;
                const osszeg = parseInt(osszegStr)
                return konyvelesDatuma === "" ? [] : {
                        konyvelesDatuma: konyvelesDatuma,
                        tranzakcioAzon: tranzakcioAzon,
                        tipus: tipus,
                        konyvelesiSzamla: konyvelesiSzamla,
                        konyvelesiSzamlaNeve: konyvelesiSzamlaNeve,
                        partnerSzamla: partnerSzamla,
                        partnerNev: partnerNev,
                        osszeg: osszeg,
                        deviza: deviza,
                        kozlemeny: kozlemeny,
                } as BankTransfer;
            });

            // this.memo[path] = transfers
            return transfers;
        });
    }

    private static processBankiTransfers(bankiTransfers: BankTransfer[]) {
        const ret = bankiTransfers.map(transfer => {
            return {
                datum: transfer.konyvelesDatuma,
                tipus: transfer.tipus,
                from: transfer.osszeg > 0 ? transfer.partnerNev : transfer.konyvelesiSzamlaNeve,
                to: transfer.osszeg > 0 ? transfer.konyvelesiSzamlaNeve : transfer.partnerNev,
                osszeg: transfer.osszeg,
                kozlemeny: transfer.kozlemeny
            } as Transfer
        })
        return ret
    }
    
    // private def correctKHBError(t: TransferRow)(implicit file: File) = {
    //     val whenFixed = DateTime.parse("2014-07-03")
    //     val lastModified = new DateTime(file.lastModified())
    
    //     if( (lastModified.isAfter(whenFixed)) || (t.osszeg startsWith("-")) )
    //       t
    //     else
    //       t.copy( konyvelesiSzamlaNeve = t.partnerNev, partnerNev = t.konyvelesiSzamlaNeve)
    //   }
    
    //   private def removeIBANPrefix(t: TransferRow) =
    //     if(t.partnerSzamla.toUpperCase() startsWith("HU"))
    //       t.copy( partnerSzamla = t.partnerSzamla drop 4) //pl. HU95 (hash kod)
    //     else
    //       t
      
    //   private def nonameToHKB(t: TransferRow) = 
    //     if(t.partnerNev.isEmpty)
    //       t.copy( partnerNev = "K&H Bank" )
    //     else
    //       t
    
    //   private def noAccountToQuestion(t: TransferRow) = 
    //     if(t.partnerSzamla.isEmpty)
    //       t.copy( partnerSzamla = t.partnerNev )
    //     else
    //       t
          
    //   //HU levagasa utan
    //   private def missingZeros(t: TransferRow) = {
    //     val t1 =
    //     if(t.partnerSzamla.size == 2*8)
    //       t.copy( partnerSzamla = t.partnerSzamla + "00000000" )
    //     else
    //       t
    
    //     if(t1.konyvelesiSzamla.size == 2*8)
    //       t1.copy( konyvelesiSzamla = t.konyvelesiSzamla + "00000000" )
    //     else
    //       t1
    //   }

    private static khbFix = (transfer: BankTransfer) => {
        const whenFixed = Date.parse("2015-01-01")  // Date.parse("2014-07-03")
        const kd = Date.parse(transfer.konyvelesDatuma)

        return ( kd > whenFixed || transfer.osszeg < 0) ? transfer : {
            ... transfer,
            konyvelesiSzamlaNeve: transfer.partnerNev, 
            partnerNev: transfer.konyvelesiSzamlaNeve 
        }
    }

    private static kozlemenyFix = (transfer: BankTransfer) => {
        return ( transfer.kozlemeny === "KL-2020-1 szla kiegy.Rendszerkbt. II. hó") ? {
            ... transfer,
            kozlemeny: "KL-2021-1 szla kiegy.Rendszerkbt. II. hó", 
        } : transfer
    }

    static szamlatortenet = undefined
    public static getSzamlaTortenet() {
        if (this.szamlatortenet === undefined) {
            const pathes = getFileNames("szamlatortenet")
            const bankiTransfers = TransferModel.getTransfersFromFile(pathes).map( TransferModel.khbFix ).map( TransferModel.kozlemenyFix )
            const transfers = TransferModel.processBankiTransfers(bankiTransfers)
            this.szamlatortenet = transfers
        }

        return this.szamlatortenet
    }
}

