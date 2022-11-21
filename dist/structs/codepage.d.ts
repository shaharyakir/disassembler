import { Slice } from 'ton';
declare type Op = ((slice: Slice, ident: number) => string) | string;
export declare class Codepage {
    private readonly _trie;
    insertHex(hex: string, len: number, op: Op): void;
    insertBin(bin: string, op: Op): void;
    getOp(bitPrefix: string): Op | null;
    find(prefix: string): string[];
}
export {};
//# sourceMappingURL=codepage.d.ts.map