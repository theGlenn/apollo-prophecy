export type JsonInputErrorEntry = {
  message: string
  code: string
  [key:string]: any
}

export type ErrorOutputEntry = {
  name: string
  message?: string
  extensions: {
    code: string
    [key:string]: any
  }
}

export type JsonInputErrorEntryRecord = { [key:string]: JsonInputErrorEntry }
export type JsonOutputEntriesRecord = { [key:string]: ErrorOutputEntry }

export function toErrorEntries(entries: ErrorOutputEntry[]) {
  return entries.reduce((map, entry) => {
    map[entry.name] = entry;
    return map;
  }, {} as JsonOutputEntriesRecord);
}

export function toOutputErrors(entries: JsonInputErrorEntryRecord) {
  return Object.keys(entries).map((key) => {
    const { name, message, code, ...rest } = entries[key];
    return {
      name: name || key,
      message: message,
      extensions: {
        code,
        ...rest
      }
    } as ErrorOutputEntry
  });
}