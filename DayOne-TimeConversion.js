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
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {
    // Write your code here
  let hours = parseInt(s.substr(0, 2));
  let minutes = s.substr(3, 2);
  let seconds = s.substr(6, 2);
  let ampm = s.substr(8, 2);
  
  if (ampm === "AM" && hours === 12) {
    hours = 0;
  } else if (ampm === "PM" && hours < 12) {
    hours = hours + 12;
  }
  return (hours < 10 ? "0" + hours : hours) + ":" + minutes + ":" + seconds;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const s = readLine();
    const result = timeConversion(s);

    ws.write(result + '\n');
    ws.end();
}
