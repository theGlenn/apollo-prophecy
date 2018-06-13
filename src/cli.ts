#!/usr/bin/env node

import * as minimist from 'minimist';
import { ParsedArgs } from 'minimist';

import { generate, askErrors } from './commands';

// apollo-prophecy generate errors.json
// apollo-prophecy ask-erros http://localhost:3000/graphql -q Errs.ts
interface Args extends ParsedArgs {
  generate?: string
  "ask"?: string

  file?: string
  f?: string

  out?: string
  o?: string

  query?: string
  q?: string

  type?: string
};

type Method = 'generate' | 'ask-errors'

const argv = minimist(process.argv.slice(2)) as Args;

if(argv._.length > 0) {
  console.log('Executing with', argv);

  const [method = 'generate'] = argv._;
  
  if(method === 'generate') {
    const { file, f, out, o } = argv;
    const jsonfile = file || f || argv._[1];
    const outFile = out || o;
    generate({ intputFilePath: jsonfile, outputFilePath: outFile });
  } else if(method === 'ask') {
    const { type: errorType, file, f, out, o } = argv;
    const input = file || f || argv._[1];
    const outFile = out || o;
    askErrors({ input, errorType });
  }
}