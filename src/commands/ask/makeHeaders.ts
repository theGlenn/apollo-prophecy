// https://github.com/apollographql/apollo-codegen/blob/master/packages/apollo-codegen/src/cli.ts
export const makeHeaders = (headers: string[] = []) => {
  let additionalHeaders: { [key: string]: string } = {};
  for (const header of headers) {
    const separator = header.indexOf(":");
    const name = header.substring(0, separator).trim();
    const value = header.substring(separator + 1).trim();
    if (!(name && value)) {
      throw new Error('Headers should be specified as "Name: Value"');
    }
    additionalHeaders[name] = value;
  }
  return additionalHeaders;
};
