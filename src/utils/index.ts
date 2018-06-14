
import * as fs from './fs-prophecy';

export const removeWhiteSpaces = (text: string) => text.replace(/[^a-zA-Z]/g, "");

export {
  fs
} 
