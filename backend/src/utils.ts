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


export
const atalanyFrom = new Date('2021-06-01')

export 
const kataFrom = new Date('2019-02-01')