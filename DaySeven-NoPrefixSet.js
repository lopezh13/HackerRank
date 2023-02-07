'use strict';

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
 * Complete the 'noPrefix' function below.
 *
 * The function accepts STRING_ARRAY words as parameter.
 */

class TrieNode {
    constructor() {
        this.edges = new Map();
        this.indexes = [];
        this.isWordEnd = false;
    }
}

function insertWord(root,  word, index) {
    let currentNode = root;
    for (let character of word) {
        if (!currentNode.edges.has(character)) {
            currentNode.edges.set(character, new TrieNode())
        }
        currentNode = currentNode.edges.get(character);
    }
    currentNode.indexes.push(index);
    currentNode.isWordEnd = true;
}
/*
 * Complete the 'noPrefix' function below.
 *
 * The function accepts STRING_ARRAY words as parameter.
 */

function noPrefix(words) {
    // Write your code here
    const root = new TrieNode();
    let badWordIndex = -1;
    for (let i = 0; i < words.length; i++) {
        insertWord(root, words[i], i)
        let hasPrefix = false;
        let isPrefix = false;
        let current = root;
        for (let character of words[i]) {
            if (current.isWordEnd) {
                hasPrefix = true
                break;
            }
            current = current.edges.get(character);
        }
        if (current.indexes.length > 1) {
            hasPrefix = true;
        }
        if (current.edges.size > 0) {
            isPrefix = true;
        }
        if (hasPrefix || isPrefix) {
            badWordIndex = i;
            break;
        }
    }
    if (badWordIndex === -1) {
        console.log('GOOD SET');
    } else {
        console.log('BAD SET');
        console.log(words[badWordIndex]);
    }
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    let words = [];

    for (let i = 0; i < n; i++) {
        const wordsItem = readLine();
        words.push(wordsItem);
    }

    noPrefix(words);
}
