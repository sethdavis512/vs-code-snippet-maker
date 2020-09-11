const fs = require('fs')
const path = require('path')
const prettier = require('prettier')
const inquirer = require('inquirer')

const read = async (filePath: string) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err: any, data: string) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

const write = (filePath: string, fileName: string, content: any) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${filePath}/${fileName}.json`, content, (err: any) => {
            if (err) reject(err)
            console.log('\n💥SNIPPET CREATED\n')
        })
    })
}

async function run() {
    const [pathToSnippet] = process.argv.slice(2)

    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Name'
        },
        {
            type: 'input',
            name: 'prefix',
            message: 'Trigger'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description?'
        }
    ]

    try {
        const answers = await inquirer.prompt(questions)

        const resolvedPath = path.resolve(pathToSnippet)
        const targetDir = path.parse(resolvedPath).dir

        const data = await read(resolvedPath)
        const content = data.toString()
        // VS Code snippets require an array of strings
        const body = content.split('\n')
        const snippetObj = {
            [answers.name]: {
                prefix: answers.prefix,
                body,
                description: answers.description
            }
        }
        const stringifiedSnippet = JSON.stringify(snippetObj, null, 4)

        write(targetDir, answers.name, stringifiedSnippet)
    } catch (error) {
        console.log(error)
    }
}

run()
