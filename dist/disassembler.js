"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromCode = exports.decompileMethodsMap = exports.decompile = exports.setCodepage = void 0;
const bn_js_1 = require("bn.js");
const ton_1 = require("ton");
const cp0_generated_1 = require("./codepages/cp0.generated");
const knownMethods_1 = require("./consts/knownMethods");
const isDebug_1 = require("./utils/isDebug");
let codepage = cp0_generated_1.CP0Auto;
function setCodepage(cp) {
    codepage = cp;
}
exports.setCodepage = setCodepage;
function decompile(slice, indent) {
    let result = '';
    const append = (txt) => {
        if (txt instanceof ton_1.Cell) {
            result += txt.toString(' '.repeat(indent || 0));
            return;
        }
        if (indent) {
            for (let i = 0; i < indent; i++)
                result += ' ';
        }
        result += txt + '\n';
    };
    let opCode = '';
    while (slice.bits.length > slice.bits.currentOffset) {
        let opCodePart = slice.readBit();
        opCode += opCodePart ? '1' : '0';
        let matches = codepage.find(opCode);
        if (matches.length > 1) {
            continue;
        }
        if (matches.length == 1 && opCode.length !== matches[0].length) {
            continue;
        }
        if (matches.length == 0) {
            let fullCell = new ton_1.Cell();
            fullCell.bits.writeBitArray(Array.from(opCode).map(a => a == '0' ? false : true));
            fullCell.writeCell(slice.toCell());
            append(fullCell);
            continue;
        }
        let op = codepage.getOp(opCode);
        opCode = '';
        if (typeof op === 'string') {
            append(op);
        }
        else if (typeof op === 'function') {
            let opTxt = op(slice, indent || 0);
            append(opTxt);
        }
        if (slice.bits.length == slice.bits.currentOffset && slice.refs.length > 0) {
            slice = slice.readRef();
        }
    }
    return result;
}
exports.decompile = decompile;
function decompileMethodsMap(slice, indent) {
    var _a;
    let methodsMap = slice.readDict(19, (slice) => {
        try {
            return decompile(slice.clone(), (indent || 0) + 4);
        }
        catch (e) {
            (0, isDebug_1._isDebug)() && console.error(e);
            return slice.toCell().toString(' '.repeat((indent || 0) + 4));
        }
    });
    let result = '';
    const append = (txt) => {
        if (indent) {
            for (let i = 0; i < indent; i++)
                result += ' ';
        }
        result += txt + '\n';
    };
    append('(:methods');
    indent = (indent || 0) + 2;
    for (let [key, code] of methodsMap) {
        let cell = new ton_1.Cell();
        cell.bits.writeUint(new bn_js_1.BN(key), 19);
        let methodId = cell.beginParse().readIntNumber(19);
        append(`${(_a = knownMethods_1.KnownMethods[methodId]) !== null && _a !== void 0 ? _a : methodId}: \n${code}`);
    }
    result = result.slice(0, -1); // remove trailing newline
    indent -= 2;
    append(')');
    result = result.slice(0, -1); // remove trailing newline
    return result;
}
exports.decompileMethodsMap = decompileMethodsMap;
function fromCode(cell) {
    let slice = cell.beginParse();
    let header = slice.readUintNumber(16);
    if (header !== 0xff00) {
        throw new Error('unsupported codepage');
    }
    let result = 'SETCP0\n';
    result += decompile(slice);
    return result;
}
exports.fromCode = fromCode;
//# sourceMappingURL=disassembler.js.map