import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import type { Stats } from 'fs';
import type { ConfigOptions } from '~/types';

interface ConfigOptionsWithExtends extends ConfigOptions {
  extends: string;
}

export function stat(filePath: string): Promise<Stats | undefined> {
  return promisify(fs.stat)(filePath).catch(() => undefined);
}

export function statSync(filePath: string): Stats | undefined {
  let stats: Stats | undefined;
  try {
    stats = fs.statSync(filePath);
  } catch (err: unknown) {
    stats = undefined;
  }
  return stats;
}

export function isFile(stats: Stats): boolean {
  return stats.isFile() || stats.isFIFO();
}

export function isDir(stats: Stats): boolean {
  return stats.isDirectory();
}

export function isJson(filePath: string): boolean {
  return path.extname(filePath) === '.json';
}

export function extendedTsconfigPath(basePath: string, to: string | undefined): string {
  if (to == null) {
    return basePath;
  }
  // start with './' or '../'
  if (/^\.{1,2}\//.test(to)) {
    return path.resolve(path.dirname(basePath), to);
  }
  // resolve as a path to NPM package
  const npmPackagePath = path.isAbsolute(to) ? to.replace(/^\/+/, '') : to;
  return require.resolve(npmPackagePath);
}

export function hasProp<T extends string>(
  obj: unknown,
  type: T,
): obj is typeof obj & Record<T, unknown> {
  return type != null && Object.prototype.hasOwnProperty.call(obj, type);
}

export function hasExtendsProp(config: ConfigOptions): config is ConfigOptionsWithExtends {
  return hasProp(config, 'extends') && typeof config.extends === 'string';
}
