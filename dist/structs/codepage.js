"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Codepage = void 0;
const trie_1 = require("./trie");
class Codepage {
    constructor() {
        this._trie = new trie_1.Trie();
    }
    insertHex(hex, len, op) {
        let prefix = Array.from(parseInt(hex, 16).toString(2)).slice(0, len).join('');
        if (prefix.length < len) {
            prefix = new Array(len - prefix.length).fill('0').join('') + prefix;
        }
        this._trie.insert(prefix, op);
    }
    insertBin(bin, op) {
        this._trie.insert(bin, op);
    }
    getOp(bitPrefix) {
        return this._trie.getValue(bitPrefix);
    }
    find(prefix) {
        return this._trie.find(prefix);
    }
}
exports.Codepage = Codepage;
//# sourceMappingURL=codepage.js.map