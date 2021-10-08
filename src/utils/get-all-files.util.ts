import * as path from 'path'
import * as fs from 'fs'

export function getAllFiles(dirPath, arrayOfFiles = [], extesion = '') {

    const files = fs.readdirSync(dirPath)

    for (const file of files) {

        if (fs.statSync(dirPath + "/" + file).isDirectory()) {

            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles, extesion)
        }
        else {

            if (!extesion || path.extname(file) === extesion) {

                arrayOfFiles.push(path.join(dirPath, "/", file))
            }
        }
    }

    return arrayOfFiles
}