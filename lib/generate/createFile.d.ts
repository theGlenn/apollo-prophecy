import { ErrorEntries } from './../types';
export declare type ScalarType = "Boolean" | "Int" | "Float" | "String";
export declare type ScalarTypesMap = {
    [key: string]: ScalarType;
};
export declare function mapFieldToGraphQLTypes(entries: ErrorEntries): ScalarTypesMap[];
export declare function createGraphqlType(entries: ErrorEntries): string;
export default function (entries: ErrorEntries): string;
