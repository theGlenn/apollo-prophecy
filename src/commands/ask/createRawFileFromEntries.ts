import { ErrorEntries } from "../../types";

const TopMostImportsAndConfigDef = `/* tslint:disable */ 
import { ApolloError } from "apollo-client";
import { GraphQLError } from "graphql";`

const PropheticErrorCodeEnumDef = `
export enum PropheticErrorCode {
  CodeLessError = 'NONE',
  _VALUES_
}`;

const PropheticErrorDef = `
export class PropheticError {
  constructor(public codes: string[]){}

  private inCodes(code: PropheticErrorCode){ return this.codes.indexOf(code) > -1; }

  get isCodeLessError() { return this.inCodes(PropheticErrorCode.CodeLessError); }
  _FUNCTIONS_
}`;

const PropheticErrorGetterDef = "get is$_ENUM_$() { return this.inCodes(PropheticErrorCode.$_ENUM_$); }";

const PropheticErrorHandledDef = `
export interface Handler {
  (): any
}

export class PropheticErrorHandled {
  private handler: Handler = () => {}

  constructor(public codes: string[]){}

  private inCodes(code: PropheticErrorCode, handler: Handler){
    if(this.codes.indexOf(code) > -1){
      this.handler = handler
    }

    return this;
  }

  CodeLessError(handler: Handler) { return this.inCodes(PropheticErrorCode.CodeLessError, handler); }
  _FUNCTIONS_
}`
const PropheticErrorHandlerDef = "$_ENUM_$(handler: Handler) { return this.inCodes(PropheticErrorCode.$_ENUM_$, handler); }";

const BottomExportedMethods = `
const CODE_LESS_EXTENSION = { code: 'NONE'};
const findCodes = (error: ApolloError | GraphQLError): PropheticErrorCode[] => {
  if(error instanceof ApolloError) {
    return error.graphQLErrors.map((gError) => findCodes(gError)[0]);
  } else if(error.extensions) {
    const { extensions: { code } = CODE_LESS_EXTENSION } = error;
    return [code];
  }

  return [PropheticErrorCode.CodeLessError];
}

export const errorHere = (error: ApolloError | GraphQLError | undefined ) => {
  if(!error) {
    return new PropheticError([]);
  }
  const codes = findCodes(error);
  return new PropheticError(codes);
}

export const isThis = (error: ApolloError | GraphQLError | undefined) => {
  if(!error) {
    return new PropheticErrorHandled([]);
  }
  const codes = findCodes(error);
  return new PropheticErrorHandled(codes);
}`
export default function(entries: ErrorEntries) {
  const nameAndCodeTuples: [string, string][] = Object.keys(entries).map((key) => {
    const { extensions = { code: undefined } } = entries[key];
    return [key, extensions.code] as [string, string]
  })
  .filter(([_, code]) => code !== undefined);

  const enums = nameAndCodeTuples.map(([name, code]) => `${name} = "${code}"`).join(',\n  ');

  const errorDefFun = nameAndCodeTuples.map(([name]) => {
    return `${PropheticErrorGetterDef.replace("$_ENUM_$", name).replace("$_ENUM_$", name)}`;
  }).join('\n  ');

  const errorHandledFun = nameAndCodeTuples.map(([name]) => {
    return `${PropheticErrorHandlerDef.replace("$_ENUM_$", name).replace("$_ENUM_$", name)}`;
  }).join('\n  ');

  return `${TopMostImportsAndConfigDef}
  ${PropheticErrorCodeEnumDef.replace('_VALUES_', enums)}
  ${PropheticErrorDef.replace('_FUNCTIONS_', errorDefFun)}
  ${PropheticErrorHandledDef.replace('_FUNCTIONS_', errorHandledFun)}
  ${BottomExportedMethods}`;
}