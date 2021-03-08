import { getFileNames } from "../utils";
import Transfer from "./transfer.interface";
import * as fs from 'fs'

export
class TransferModel {

    private static getTransfersFromFile(pathes: any[]) {
        return pathes.flatMap(path => {
            const file = fs.readFileSync(path, 'utf-8');
            // split the contents by new line
            const lines = file.split(/\r?\n/);
            const [header, ...dataLines] = lines;
            const transfers : Transfer[] = dataLines.flatMap(line => {
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
                } as Transfer;
            });

            return transfers;
        });
    }

    public static getSzamlaTortenet() {
        const pathes = getFileNames("szamlatortenet")
        const transfers = this.getTransfersFromFile(pathes)
        return transfers
    }
}