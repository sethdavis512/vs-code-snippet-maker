// Snippet Maker
const prettier = require('prettier');
const fs = require('fs');
const source = './sourceSnippet.txt';

const file = fs.readFileSync(source, { encoding: 'UTF8' });

// Config
const name = 'Test Snippet';
// Trigger for snippet
const prefix = 'test';
const description = 'This is a test';
const body = file.trim().split('\n');

const snippetObj = {
    [name]: {
        prefix,
        body,
        description
    }
};

const toString = JSON.stringify(snippetObj);
const formattedSnippet = prettier.format(toString, {
    parser: 'json',
    tabWidth: 4
});

fs.writeFile('outputSnippet.json', formattedSnippet, err => {
    if (err) throw err;
    console.log(
        Array(50)
            .fill('#')
            .join('')
    );
    console.log('\nSNIPPET CREATED\n');
    console.log(
        Array(50)
            .fill('#')
            .join('')
    );
});
