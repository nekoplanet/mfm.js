export type Success<T> = {
    success: true;
    value: T;
    index: number;
};
export type Failure = {
    success: false;
};
export type Result<T> = Success<T> | Failure;
interface State {
    trace?: boolean;
    linkLabel?: boolean;
    nestLimit: number;
    depth: number;
}
export type ParserHandler<T> = (input: string, index: number, state: State) => Result<T>;
export declare function success<T>(index: number, value: T): Success<T>;
export declare function failure(): Failure;
export declare class Parser<T> {
    name?: string;
    handler: ParserHandler<T>;
    constructor(handler: ParserHandler<T>, name?: string);
    map<U>(fn: (value: T) => U): Parser<U>;
    text(): Parser<string>;
    many(min: number): Parser<T[]>;
    sep(separator: Parser<unknown>, min: number): Parser<T[]>;
    select<K extends keyof T>(key: K): Parser<T[K]>;
    option(): Parser<T | null>;
}
export declare function str<T extends string>(value: T): Parser<T>;
export declare function regexp<T extends RegExp>(pattern: T): Parser<string>;
type ParsedType<T extends Parser<unknown>> = T extends Parser<infer U> ? U : never;
export type SeqParseResult<T extends unknown[]> = T extends [] ? [] : T extends [infer F, ...infer R] ? (F extends Parser<unknown> ? [ParsedType<F>, ...SeqParseResult<R>] : [unknown, ...SeqParseResult<R>]) : unknown[];
export declare function seq<Parsers extends Parser<unknown>[]>(...parsers: Parsers): Parser<SeqParseResult<Parsers>>;
export declare function alt<Parsers extends Parser<unknown>[]>(parsers: Parsers): Parser<ParsedType<Parsers[number]>>;
export declare function notMatch(parser: Parser<unknown>): Parser<null>;
export declare const cr: Parser<"\r">;
export declare const lf: Parser<"\n">;
export declare const crlf: Parser<"\r\n">;
export declare const newline: Parser<"\r" | "\n" | "\r\n">;
export declare const char: Parser<string>;
export declare const lineBegin: Parser<null>;
export declare const lineEnd: Parser<null>;
export declare function lazy<T>(fn: () => Parser<T>): Parser<T>;
type ParserTable<T> = {
    [K in keyof T]: Parser<T[K]>;
};
export declare function createLanguage<T>(syntaxes: {
    [K in keyof T]: (r: ParserTable<T>) => Parser<T[K]>;
}): ParserTable<T>;
export {};
