import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import type { Stats } from 'fs';
import type { ConfigOptions } from './types';

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

export function existPathAsDir(dirPath: string): Promise<boolean> {
  return stat(dirPath)
    .then((stats) => stats != null && isDir(stats))
    .catch(() => false);
}

export function existPathAsDirSync(dirPath: string): boolean {
  let stats: Stats | undefined;
  try {
    stats = statSync(dirPath);
  } catch (err) {
    stats = undefined;
  }
  return stats != null && isDir(stats);
}

export function normalizeJsonFileName(filePath: string): string {
  return path.extname(filePath) === '.json' ? filePath : `${filePath}.json`;
}

export function resolvePath(filePath: string | undefined): string {
  return path.resolve(filePath || './');
}

/**
 * @param {string} basePath - path to a config file
 * @param {string} to - relative path or path to a npm package
 * @returns {string}
 */
export function extendedTsconfigPath(basePath: string, to: string | undefined): string {
  if (to == null) {
    return basePath;
  }
  // start with '.' or '..'
  if (/^\.{1,2}/.test(to)) {
    return path.resolve(path.dirname(basePath), to);
  }
  // resolve as path to npm package
  const npmPackagePath = path.isAbsolute(to) ? to.replace(/^\/+/, '') : to;
  return require.resolve(npmPackagePath);
}

export function mergeConfig(prev: ConfigOptions, curr: ConfigOptions): ConfigOptions {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { references, ...base } = prev;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { extends: extendsProp, ...extended } = curr;
  const compilerOptions =
    base.compilerOptions != null || extended.compilerOptions != null
      ? Object.assign(base.compilerOptions, extended.compilerOptions)
      : undefined;
  return compilerOptions != null
    ? Object.assign(base, extended, { compilerOptions })
    : Object.assign(base, extended);
}

export function hasProp<T extends string>(
  obj: unknown,
  type: T,
): obj is typeof obj & Record<T, unknown> {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, type);
}

export function hasExtendsProp(config: ConfigOptions): config is ConfigOptionsWithExtends {
  return hasProp(config, 'extends') && typeof config.extends === 'string';
}
