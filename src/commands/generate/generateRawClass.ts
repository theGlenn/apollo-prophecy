import createError, { PropheticErrorTextDef } from './createError'
import { JsonInputErrorEntryRecord, JsonInputErrorEntry, toOutputErrors } from '../../types';

export type ScalarType = "Boolean" | "Int" | "Float" | "String"
export type ScalarTypesMap = {[key: string]: ScalarType};

function scalarGQLTpeFromValue(value: any): ScalarType | null {
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
      throw new Error(`Non scalar type define for "${value}" type is ${typeof value}`);
  }
}

export function toRawClassesArray(entries: JsonInputErrorEntryRecord) {
  return Object.keys(entries).map((key) => {
    const { message, code, ...rest } = entries[key];
    return createError(key, message, code, rest);
  });
}

export function toScalarTypesMap(entries: JsonInputErrorEntryRecord): ScalarTypesMap[] {
  const initial: ScalarTypesMap = {};
  return Object.values(entries).map((entry) => Object.keys(entry).filter(key => key !== 'message').reduce((prev, entryFieldKey) => {
    const fieldValue = entry[entryFieldKey];
    const fieldType = scalarGQLTpeFromValue(fieldValue);
    if (fieldType) prev[entryFieldKey] = fieldType;
    
    return prev;
  }, initial),{});
}

type TypeDefinition = { type: string, isNullableType: boolean }
type TypeDefinitionsMap = {[key: string]: TypeDefinition }

export function generatePropheticErrorType(typesArray: ScalarTypesMap[]) {
  const fieldsReduced = typesArray.filter(type => type).reduce((prev: TypeDefinitionsMap, typesMap) => {
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


  const fields = Object.entries(fieldsReduced).map(([name, { type, isNullableType } ]) => {
    return `${name}: ${type}${isNullableType ? '?': ''}`
  });
  
  return `
    type PropheticErrorExtensions {
      ${fields.join('\n      ')}
    }
    
    type PropheticError {
      name: String
      message: String?
      extensions: PropheticErrorExtensions
    }
  `
}

export default function generateRawClass (entries: JsonInputErrorEntryRecord) {
  const rawErrorClasses = toRawClassesArray(entries).join('\n');
  const fieldsTypesMapArray = toScalarTypesMap(entries);
  const rawPropheticErrorAndExtensionsType = generatePropheticErrorType(fieldsTypesMapArray);
  const errorsList = toOutputErrors(entries);

  const classFile = `
  import { ApolloError } from 'apollo-server'

  export const errorsList = ${JSON.stringify(errorsList, null, 2)};
  export const errorType = \`${rawPropheticErrorAndExtensionsType}\`;
  
  ${PropheticErrorTextDef}
  
  ${rawErrorClasses}
  `
  return classFile;
}