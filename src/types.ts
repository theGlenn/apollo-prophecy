export type ErrorEntry = {
  extensions?: { code: string }
  [key:string]: any
}
export type ErrorEntries = { [key:string]: ErrorEntry }

export function toErrorEntries(entries: ErrorEntry[]) {
  return entries.reduce((map, entry) => {
    map[entry.name] = entry;
    return map;
  }, {} as ErrorEntries);
}