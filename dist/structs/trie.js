"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = void 0;
class TrieNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.parent = null;
        this.children = {};
        this.end = false;
    }
    getWord() {
        var output = [];
        var node = this;
        while (node !== null) {
            output.unshift(node.key);
            node = node.parent;
        }
        return output.join('');
    }
    ;
}
function findAllWords(node, arr) {
    // base case, if node is at a word, push to output
    if (node.end) {
        arr.unshift(node.getWord());
    }
    // iterate through each children, call recursive findAllWords
    for (var child in node.children) {
        findAllWords(node.children[child], arr);
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode(null, null);
    }
    insert(word, value) {
        var node = this.root;
        for (var i = 0; i < word.length; i++) {
            if (node.end) {
                console.log(node.getWord(), node.value);
                throw new Error('Word cannot start with already used prefix');
            }
            if (!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode(word[i], null);
                node.children[word[i]].parent = node;
            }
            node = node.children[word[i]];
            // finally, we check to see if it's the last word.
            if (i == word.length - 1) {
                if (Object.entries(node.children).length > 0) {
                    console.log(node.getWord(), this.find(node.getWord()));
                    throw new Error('Word cannot start with already used prefix');
                }
                // if it is, we set the end flag to true.
                node.end = true;
                node.value = value;
            }
        }
    }
    contains(word) {
        var node = this.root;
        for (var i = 0; i < word.length; i++) {
            if (node.children[word[i]]) {
                node = node.children[word[i]];
            }
            else {
                return false;
            }
        }
        return node.end;
    }
    find(prefix) {
        var node = this.root;
        var output = [];
        for (var i = 0; i < prefix.length; i++) {
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]];
            }
            else {
                return output;
            }
        }
        findAllWords(node, output);
        return output;
    }
    getValue(key) {
        var node = this.root;
        for (var i = 0; i < key.length; i++) {
            if (node.children[key[i]]) {
                node = node.children[key[i]];
            }
            else {
                return null;
            }
        }
        if (!node.end) {
            return null;
        }
        return node.value;
    }
}
exports.Trie = Trie;
//# sourceMappingURL=trie.js.map