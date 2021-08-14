import fs from 'fs'

export const getContentFile = () => {
    if(contentFile) {
        return contentFile;
    }

    else {
        console.log('Reading content.json ...');
        contentFile = JSON.parse(fs.readFileSync('content.json', 'utf-8'))
        return contentFile;
    }
}

var contentFile;