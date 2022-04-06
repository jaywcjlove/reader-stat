/// <reference types="node" />

import { Stats } from 'fs';
import { Mode } from 'stat-mode';

export const readLink: (currentPath: string) => Promise<string | Buffer>;
export const readdir: (dir: string) => Promise<Stats[]>;
/** Read a single directory or file the [stat](http://nodejs.cn/api/fs.html#fs_class_fs_stats) info. */
export const getStat: (dirOrFile: string) => Promise<Stats>;
/** Get all the file names in the directory. */
export const readdirAsync: (directory: string) => Promise<string[]>;
export const uidToName: (id?: string) => Promise<string | Record<string, string>[]>;
export const chmod: (file: string, mode: number | Mode) => Promise<null>;

