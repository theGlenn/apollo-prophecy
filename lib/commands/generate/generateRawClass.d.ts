import { JsonInputErrorEntryRecord, JsonInputErrorEntry } from '../../types';
export declare type ScalarType = "Boolean" | "Int" | "Float" | "String";
export declare type ScalarTypesMap = {
    [key: string]: ScalarType;
};
export declare function toRawClassesArray(entries: JsonInputErrorEntryRecord): string[];
export declare const exludeMessageAndName: (entry: JsonInputErrorEntry) => string[];
export declare function toScalarTypesMap(entries: JsonInputErrorEntryRecord): ScalarTypesMap[];
export declare function generatePropheticErrorType(typesArray: ScalarTypesMap[]): string;
export default function (entries: JsonInputErrorEntryRecord): string;
