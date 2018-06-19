import { JsonInputErrorEntryRecord } from '../../types';

export default (inputEntries: JsonInputErrorEntryRecord) => {
  const checks = Object.keys(inputEntries).map(key => {
    const entry = inputEntries[key];
    return { name: key, hasCodeKey: entry.code !== undefined }
  }).filter(({ hasCodeKey }) => !hasCodeKey);
   
  if(checks.length > 0) {
    const concernedNames = checks.map(({ name }) => name).join();
    throw Error(`[CodeKeyImperative] No "code" key found for: [${concernedNames}]`);
  }
  return inputEntries;
}
