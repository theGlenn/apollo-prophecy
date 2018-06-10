import * as minimist from 'minimist';
import { ParsedArgs } from 'minimist';

import generate from './generate';
import ask from './ask';

// apollo-oracle prophecy errors.json
// apollo-oracle ask http://localhost:3000/graphql -q appErrors
interface Args extends ParsedArgs {
  generate?: string
  "ask-errors"?: string

  file?: string
  f?: string

  out?: string
  o?: string

  query?: string
  q?: string
};

const argv = minimist(process.argv.slice(2)) as Args;

if(argv._.length > 0) {
  console.log('Executing with', argv);

  const [method = 'generate'] = argv._;
 
  if(method === 'generate') {
    const { file, f, out, o } = argv;
    const jsonfile = file || f || argv._[1];
    const outFile = out || o;
    generate({ intputFilePath: jsonfile, outputFilePath: outFile });
  } else if(method === 'ask-errors') {
    ask()
  }
}