import { getFileNames } from "../utils";
import { BankTransfer, Transfer } from "./transfer.interface";
import * as fs from 'fs'

export
class TransferModel {

    private static getTransfersFromFile(pathes: any[]) {
        return pathes.flatMap(path => {
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
    
    public static getSzamlaTortenet() {
        const pathes = getFileNames("szamlatortenet")
        const bankiTransfers = TransferModel.getTransfersFromFile(pathes)
        const transfers = TransferModel.processBankiTransfers(bankiTransfers)
        return transfers
    }
}

