/// <reference types="@types/node" />
import * as fs from 'fs';
import * as jsonfile from 'jsonfile';
import { JsonInputErrorEntry } from '../types';
export declare const writeFile: (path: fs.PathLike, content: string) => void;
export declare const mkdirs: (path: fs.PathLike) => any;
export declare const rmrf: (path: fs.PathLike) => any;
export declare function readJsonDef(filePath: jsonfile.Path): JsonInputErrorEntry;
