export declare type JsonInputErrorEntry = {
    message: string;
    code: string;
    [key: string]: any;
};
export declare type ErrorOutputEntry = {
    name: string;
    message?: string;
    extensions: {
        code: string;
        [key: string]: any;
    };
};
export declare type JsonInputErrorEntryRecord = {
    [key: string]: JsonInputErrorEntry;
};
export declare type JsonOutputEntriesRecord = {
    [key: string]: ErrorOutputEntry;
};
export declare function toErrorEntries(entries: ErrorOutputEntry[]): JsonOutputEntriesRecord;
export declare function toOutputErrors(entries: JsonInputErrorEntryRecord): ErrorOutputEntry[];
