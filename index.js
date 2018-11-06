const prettier = require('prettier');

// Snippet Maker
const name = 'Test Snippet';
const prefix = 'test';
const description = 'This is a test';

const code = `
<div>
    <div>Hello</div>
    <div>Hello</div>
    <div>Hello</div>
</div>
`;

const body = code.trim().split('\n');

const snippetObj = {
    [name]: {
        prefix,
        body,
        description
    }
};

const toString = JSON.stringify(snippetObj);

console.log(prettier.format(toString, { parser: 'json' }));
