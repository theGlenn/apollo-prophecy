export interface ProphecyArgs {
    intputFilePath: string;
    outputFilePath?: string;
}
export default function generate(args: ProphecyArgs): Promise<string>;
