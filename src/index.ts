import * as minimist from 'minimist';
import { ParsedArgs } from 'minimist';

import prophecy from './prophecy';
import ask from './ask';

// apollo-oracle prophecy errors.json
// apollo-oracle ask http://localhost:3000/graphql -q appErrors
interface Args extends ParsedArgs {
  prophecy?: string
  ask?: string

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

  const [method = 'prophecy'] = argv._;
 
  if(method === 'prophecy') {
    const { file, f, out, o } = argv;
    const jsonfile = file || f || argv._[1];
    const outFile = out || o;
    prophecy({ intputFilePath: jsonfile, outputFilePath: outFile });
  } else {
    ask()
  }
}