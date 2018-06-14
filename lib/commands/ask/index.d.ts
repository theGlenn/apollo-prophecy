export interface AskArgs {
    input?: string;
    outputFilePath?: string;
    errorField?: string;
    headers?: string[];
}
export default function ask({ input, errorField, headers, outputFilePath }: AskArgs): Promise<string>;
