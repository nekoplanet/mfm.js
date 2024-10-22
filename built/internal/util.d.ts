import { MfmInline, MfmNode, MfmText } from '../node';
type ArrayRecursive<T> = T | Array<ArrayRecursive<T>>;
export declare function mergeText<T extends MfmNode>(nodes: ArrayRecursive<((T extends MfmInline ? MfmInline : MfmNode) | string)>[]): (T | MfmText)[];
export declare function stringifyNode(node: MfmNode): string;
export declare function stringifyTree(nodes: MfmNode[]): string;
export declare function inspectOne(node: MfmNode, action: (node: MfmNode) => void): void;
export {};
