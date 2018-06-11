import  {
  ApolloServer,
  ApolloError,
  toApolloError,
  gql,
} from 'apollo-server';

type ErrorEntry = { [key:string]: any }

export const PropheticErrorTextDef = `class PropheticError extends ApolloError {
  constructor(name: string, message: string, code?: string, properties?: Record<string, any>) {
    super(message, code, properties);

    // Set the prototype explicitly.
    // https://stackoverflow.com/a/41102306
    Object.setPrototypeOf(this, SyntaxError.prototype);
    Object.defineProperty(this, 'name', { value: name });
  }
}`


export default function(name: string, message: string, code?: string, properties?: Record<string, any>) {
  return `
  export class ${name} extends PropheticError {
    constructor(properties?: Record<string, any>) {
      super("${name}", "${message}", ${code ? `"${code}"` : undefined }, properties);
    }
  }
  `
}