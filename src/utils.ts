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

export function extendedTsconfigPath(basePath: string, to: string | undefined): string {
  if (to == null) {
    return basePath;
  }
  // start with './' or '../'
  if (/^\.{1,2}\//.test(to)) {
    return path.resolve(path.dirname(basePath), to);
  }
  // resolve as a path to npm package
  const npmPackagePath = path.isAbsolute(to) ? to.replace(/^\/+/, '') : to;
  return require.resolve(npmPackagePath);
}

export function mergeConfig(prev: ConfigOptions, curr: ConfigOptions): ConfigOptions {
  return {
    ...prev,
    ...curr,
    compilerOptions: {
      ...prev.compilerOptions,
      ...curr.compilerOptions,
    },
  };
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
