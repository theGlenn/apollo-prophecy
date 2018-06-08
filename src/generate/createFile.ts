import createError, { PythianErrorTextDef } from './createError'
import { ErrorEntries, ErrorEntry } from './../types'

export type ScalarType = "Boolean" | "Int" | "Float" | "String"
export type ScalarTypesMap = {[key: string]: ScalarType};

function scalaraTypeFromValue(value: any): ScalarType {
  switch (typeof value) {
    case "string":
      return "String"
    case "boolean":
      return "Boolean"
    case "number":
      if(value % 1 === 0){
        return "Int"
      } else {
        return "Float"
      }
    default:
      return null;
  }
}
function createDefinitions(entries: ErrorEntries) {
  const errors = []
  for (let key in entries) {
    const { message, code, ...rest } = entries[key];
    const errorPart = createError(key, message, code, rest);
    errors.push(errorPart);
  }
  return errors;
}

export function mapFieldToGraphQLTypes(entries: ErrorEntries): ScalarTypesMap[] {
  return Object.values(entries).map((entry) => Object.keys(entry).reduce((prev, entryFieldKey) => {
    const fieldValue = entry[entryFieldKey];
    const fieldType = scalaraTypeFromValue(fieldValue);
    prev[entryFieldKey] = fieldType;
    return prev;
  }, {}),{});
}

type TypeDefinition = { type: string, isNullableType: boolean }
type TypeDefinitionsMap = {[key: string]: TypeDefinition }

export function createGraphqlType(entries: ErrorEntries) {
  const fieldsTypesMapArray = mapFieldToGraphQLTypes(entries);
  const fieldsReduced = fieldsTypesMapArray.reduce((prev: TypeDefinitionsMap, typesMap) => {
    const isFirst = prev === {}

    for (let key in typesMap) {
      const fieldType = typesMap[key];
      let isNullableType = true;
      if(!isFirst && prev[key] && prev[key].isNullableType) {
        if(prev[key].isNullableType !== true) {
          prev[key].isNullableType = prev[key].isNullableType;
        } else{
          prev[key].isNullableType = false
        }
      }

      const value = { type: fieldType, isNullableType };
      prev[key] = value;
    }
    return prev;
  },{}) as TypeDefinitionsMap
  const fields = Object.entries(fieldsReduced).map(([name, { type, isNullableType}]) => {
    return `${name}: ${type}${isNullableType ? '?': ''}`
  });
  
  return `
    type PythianError {
      ${fields.join('\n      ')}
    }
  `
}

export default function (entries: ErrorEntries) {
  const allErros = createDefinitions(entries).join('\n');
  const type = createGraphqlType(entries);
  const classFile = `
  import { ApolloError } from 'apollo-server'

  export const definitions = ${JSON.stringify(entries, null, 2)};
  export const errorType = \`${type}\`;
  
  ${PythianErrorTextDef}
  
  ${allErros}
  `
  return classFile;
}