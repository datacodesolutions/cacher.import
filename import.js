const fs = require('fs')
const shell = require('shelljs')
const path = require('path');

// const json = fs.readFileSync('./storage/exported_data_datacode.json')
const json = fs.readFileSync('./storage/exported_data_union.json')
const cacherLib = JSON.parse(json)

async function importSnippets() {
    // const library = cacherLib.teams[0].library
    const library = cacherLib.personalLibrary
    // console.log(library)

    for await (snippet of library.snippets) {
        const file = snippet.files[0]
        const filePath = path.join(__dirname, 'storage', file.filename)
        const description = snippet.description || 'N/A'

        fs.writeFileSync(filePath, file.content)
        const cacherCommand = `cacher snippets:add "${filePath}" --filename="${file.filename}" --title="${snippet.title}" --description="${description}" --quiet`
        console.log(cacherCommand)
        shell.exec(cacherCommand)
        // process.exit(1)
    }
}

importSnippets()
