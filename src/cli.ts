#!/usr/bin/env node
import * as yargs from 'yargs';
import { ParsedArgs } from 'minimist';
import { commands } from './';
import { resolve } from 'path';

function handleError(error) {
  console.error(error);
  process.exit(1);
}

process.on('unhandledRejection', (error) => { throw error });
process.on('uncaughtException', handleError);

interface Args extends ParsedArgs {
  jsonFile?: string

  out?: string
  field?: string
  headers?: string
};

yargs
  .command(
    ['generate [jsonFile]', 'prophecy'],
    'Generate a Typescript file containg all application errors from a JSON input',
    {
      out: {
        demand: true,
        describe: 'Output path for error file',
        default: './Errors.ts',
        normalize: true,
        coerce: resolve
      },
    },
    async (argv: Args) => {
      const { jsonFile = './errors.json', out: outputFilePath } = argv;
      const intputFilePath = resolve(jsonFile);
      const generatedOutputPath = await commands.generate({ intputFilePath, outputFilePath });
      console.info('🔮 You will fail... but successfully');
      console.info(`└── 👁 Prophecy available at ${generatedOutputPath}`);
    }
  )
  .command(
    ['ask <schema>', 'oracles'],
    'Generate a .ts file that exposes helpers for all the errors exposed through the server api',
    {
      field: {
        demandOption: true,
        describe: 'Field to query on Query type',
        default: 'errors',
      },
      out: {
        demandOption: true,
        describe: 'Output path for error file',
        default: './Errors.ts',
        normalize: true,
        coerce: resolve
      },
    },
    async (argv: Args) => {
      console.info('🔮 Connecting with the oracles...');
      const { schema: input, out: outputFilePath, field: errorField } = argv;
      const outputPath = await commands.ask({ input, errorField, outputFilePath });
      console.info('├── 🙏 You will fail... but successfully');
      console.info(`└── 👁 All you need to know is available at ${outputPath}`);
    }
  )
  .fail((message, error) => handleError(error ? error : new Error(message)))
  .help()
  .version()
  .strict()
  .argv;