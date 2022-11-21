declare class TrieNode<T> {
    readonly key: string | null;
    value: T | null;
    parent: TrieNode<T> | null;
    children: {
        [key: string]: TrieNode<T>;
    };
    end: boolean;
    constructor(key: string | null, value: T | null);
    getWord(): string;
}
export declare class Trie<T> {
    root: TrieNode<T>;
    insert(word: string, value: T): void;
    contains(word: string): boolean;
    find(prefix: string): string[];
    getValue(key: string): T | null;
}
export {};
//# sourceMappingURL=trie.d.ts.map