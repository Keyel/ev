import * as path from 'path'
import * as fs from 'fs'

export
const getFileNames = (prefix: string) => {
    const ret = []
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
