'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function caesarCipher(s, k) {
    // Write your code here
let result = "";
for (let i = 0; i < s.length; i++) {
let c = s.charCodeAt(i);
if (c >= 65 && c <= 90) { // Upper case
result += String.fromCharCode((c - 65 + k) % 26 + 65);
} else if (c >= 97 && c <= 122) { // Lower case
result += String.fromCharCode((c - 97 + k) % 26 + 97);
} else {
result += s[i];
}
}
return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine();

    const k = parseInt(readLine().trim(), 10);

    const result = caesarCipher(s, k);

    ws.write(result + '\n');

    ws.end();
}
