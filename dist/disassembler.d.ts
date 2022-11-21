import { Cell, Slice } from 'ton';
import { Codepage } from './structs/codepage';
export declare function setCodepage(cp: Codepage): void;
export declare function decompile(slice: Slice, indent?: number): string;
export declare function decompileMethodsMap(slice: Slice, indent?: number): string;
export declare function fromCode(cell: Cell): string;
//# sourceMappingURL=disassembler.d.ts.map