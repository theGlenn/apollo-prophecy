import { execute, makePromise } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import { ErrorEntry, toErrorEntries } from '../../types';

const makeOperation = (erroType: string) => ({
  query: gql`query {
    ${erroType} {
      name
      message
      extensions {
        code
      }
    }
  }
  `,
});

type Headers = {[name: string]: string}

function exeuteServerQuery(serverUri: string, type: string, headers: Headers) {
  const operation = makeOperation(type);
  const link = new HttpLink({ uri: serverUri, fetch, headers });

  return makePromise(execute(link, operation));
}

export default async function(serverUri: string, field: string = 'errors', headers: Headers) {
  let result;
  try {
    result = await exeuteServerQuery(serverUri, field, headers);
  } catch(e) {
    throw e;
  }

  if (result.errors) {
    throw new Error(`Errors occured querying "${field}": ${result.errors}`);
  }

  if (!result.data || !result.data[field]) {
    throw new Error(`No Errors found to generate on query field ${field}`);
  }

  const errors = result.data[field];
  return toErrorEntries(errors as ErrorEntry[]);
}