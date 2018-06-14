import { ErrorOutputEntry } from '../../types';
declare type Headers = {
    [name: string]: string;
};
export default function (serverUri: string, field: string, headers: Headers): Promise<ErrorOutputEntry[]>;
export {};
