"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ton_1 = require("ton");
const disassembler_1 = require("./disassembler");
const ton_compiler_1 = require("ton-compiler");
it('should disassemble config', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = new ton_1.TonClient({
        endpoint: 'https://scalable-api.tonwhales.com/jsonRPC'
    });
    let address = ton_1.Address.parseFriendly('Ef9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbxn').address;
    let state = yield client.getContractState(address);
    if (!state.code) {
        console.error('code not found');
        return;
    }
    let codeCell = ton_1.Cell.fromBoc(state.code)[0];
    console.log((0, disassembler_1.fromCode)(codeCell));
}));
it('should disassemble nft', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = new ton_1.TonClient({
        endpoint: 'https://mainnet.tonhubapi.com/jsonRPC'
    });
    let address = ton_1.Address.parseFriendly('EQBmG4YwsdGsUHG46rL-_GtGxsUrdmn-8Tau1DKkzQMNsGaW').address;
    let state = yield client.getContractState(address);
    if (!state.code) {
        console.error('code not found');
        return;
    }
    let codeCell = ton_1.Cell.fromBoc(state.code)[0];
    console.log((0, disassembler_1.fromCode)(codeCell));
}));
it('should dump method', () => __awaiter(void 0, void 0, void 0, function* () {
    let fiftCode = yield (0, ton_compiler_1.compileFunc)(`
        () main() {

        }

        () owner() method_id {

        }
    `);
    let code = yield (0, ton_compiler_1.compileFift)(fiftCode);
    let codeCell = ton_1.Cell.fromBoc(code)[0];
    console.log((0, disassembler_1.fromCode)(codeCell));
}));
it('should disassemble elector', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = new ton_1.TonClient({
        endpoint: 'https://mainnet.tonhubapi.com/jsonRPC'
    });
    let address = ton_1.Address.parseFriendly('Ef8zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM0vF').address;
    let state = yield client.getContractState(address);
    if (!state.code) {
        console.error('code not found');
        return;
    }
    let codeCell = ton_1.Cell.fromBoc(state.code)[0];
    console.log((0, disassembler_1.fromCode)(codeCell));
}));
it('should disassemble contract', () => __awaiter(void 0, void 0, void 0, function* () {
    let client = new ton_1.TonClient({
        endpoint: 'https://mainnet.tonhubapi.com/jsonRPC'
    });
    let address = ton_1.Address.parseFriendly('EQBRrTk63wHpvreMs7_cDKWh6zrYmQcSBOjKz1i6GcbRTLZX').address;
    let state = yield client.getContractState(address);
    if (!state.code) {
        console.error('code not found');
        return;
    }
    let codeCell = ton_1.Cell.fromBoc(state.code)[0];
    console.log((0, disassembler_1.fromCode)(codeCell));
}));
//# sourceMappingURL=disassembler.spec.js.map