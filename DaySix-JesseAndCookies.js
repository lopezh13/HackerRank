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
 * Complete the 'cookies' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY A
 */

function cookies(k, A) {
    // Write your code here
let count = 0;
    let l = A.length;
    let cookies = new Map();
    let flagK = false;
    let flag = false;
    let KEY;
    let limit = Math.ceil(k / 3);
    let last1 = Number.MAX_VALUE;
    let rest = 0;
    let last2;

    //CREATE MAP & COUNTING ZEROES AND REST
    for (let i = 0; i < l; i++) {
        //COUNTING ZEROES
        if (A[i] == 0) {
            count++;
            continue;
        }

        if (A[i] < k) {
            //COUNTING REST & SET LAST 
            if (A[i] >= limit) {
                if (A[i] < last1) last1 = A[i];
                rest++;
            }
            else {
                //CREATE A MAP
                if (cookies.has(A[i])) cookies.set(A[i], cookies.get(A[i]) + 1)
                else cookies.set(A[i], 1)
            }
        } else flagK = true
    }


    //CHEK IF ALL >= K
    if (cookies.size == 0) return 0;

    for (let i = 1; i < limit; i++) {

        if (cookies.has(i)) {

            let value = cookies.get(i)

            if (flag) {
                flag = false
                value--;
                KEY += i * 2;
                if (KEY < k) {

                    if (cookies.has(KEY)) cookies.set(KEY, cookies.get(KEY) + 1)
                    else cookies.set(KEY, 1);

                } else flagK = true
            }

            if (value % 2 == 1) {
                flag = true;
                value--;
                KEY = i;
                count++;
            } else {
            }

            if (value != 0) {
                let v2 = value / 2;
                const i3 = i * 3;
                if (i3 < k) {
                    if (cookies.has(i3)) cookies.set(i3, cookies.get(i3) + v2);
                    else cookies.set(i3, v2);
                } else flagK = true
                count += v2;

            }
            last2 = i
            cookies.delete(i)
        }
    }
    
     if (flag) {
        count--;
        rest++;
    }

    cookies.forEach((val, ki) => {
        if(ki < last1) last1 = ki;
        rest += val;
    })

    if (rest >= 2) flagK = true;
    if (last2 + last1 * 2 >= k || flag == false) count += Math.ceil(rest / 2);
    else count += Math.ceil((rest + 1) / 2);


    if (flagK == false) return -1
    else return count
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

    const result = cookies(k, A);

    ws.write(result + '\n');

    ws.end();
}
