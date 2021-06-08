import * as path from 'path'
import * as fs from 'fs'

export
const getFileNames = (prefix: string) => {
    const ret : string[] = []
    const directoryPath = path.join(__dirname, '..', 'data')
    console.log(directoryPath)
    const files = fs.readdirSync(directoryPath)
    files.forEach(file => {
        if(prefix === "" || file.startsWith(prefix)) {
            ret.push(path.join(directoryPath, file))
        }
    })        

    console.log(ret)
    return ret
}


export const getMonth = (_date: Date) => {
    const date = new Date(_date)
    date.setHours(0,0,0,0)
    date.setDate(1)
    return date
}

export 
const incMonth = (month: Date) => {
    month.setMonth(month.getMonth()+1)
}


export
const atalanyFrom = new Date('2021-06-01')

export 
const kataFrom = new Date('2019-02-01')