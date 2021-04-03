import * as path from 'path';
import { stat, statSync, isFile, isDir } from './utils';

const TS_CONFIG = 'tsconfig.json';

type StatsType = 'file' | 'dir';

function resolveDir(cwd: string): Promise<string> {
  const fullPath = path.resolve(cwd, TS_CONFIG);
  return stat(fullPath)
    .then((stats) => {
      if (isFile(stats)) {
        return fullPath;
      }
      const parentDir = path.dirname(fullPath);
      if (parentDir !== cwd) {
        return resolveDir(parentDir);
      }
      throw new TypeError(`Cannot find ${TS_CONFIG} in directories higher than the specified directory: ${cwd}`);
    });
}

function resolveDirSync(cwd: string): string {
  const fullPath = path.resolve(cwd, TS_CONFIG);
  const stats = statSync(fullPath);
  if (isFile(stats)) {
    return fullPath;
  }
  const parentDir = path.dirname(fullPath);
  if (parentDir !== cwd) {
    return resolveDirSync(parentDir);
  }
  throw new TypeError(`Cannot find ${TS_CONFIG} in directories higher than the specified directory: ${cwd}`);
}

/**
 * Resolve a configuration file, like `tsc`.
 */
export async function resolve(cwd: string, fileName?: string): Promise<string> {
  if (fileName == null) {
    return resolveDir(cwd);
  }

  const specifiedPath = path.resolve(cwd, fileName);
  const [type, tsconfigPath] = await stat(specifiedPath)
    .then<[StatsType, string]>((stats) => {
      if (isFile(stats)) {
        return ['file', specifiedPath];
      }
      if (isDir(stats)) {
        return ['dir',path.join(specifiedPath, TS_CONFIG)];
      }
      throw new TypeError(`The specified file does not exist: ${specifiedPath}`);
    });
  if (type === 'file') {
    return tsconfigPath;
  }

  return stat(tsconfigPath)
    .then((stats) => {
      if (isFile(stats)) {
        return tsconfigPath;
      }
      throw new TypeError(`Cannot find ${TS_CONFIG} file at the specified directory: ${specifiedPath}`);
    });
}

export function resolveSync(cwd: string, fileName?: string): string {
  if (fileName == null) {
    return resolveDirSync(cwd);
  }

  const specifiedPath = path.resolve(cwd, fileName);
  const stats = statSync(specifiedPath);
  if (isFile(stats)) {
    return specifiedPath;
  }

  if (isDir(stats)) {
    const tsconfigPath = path.resolve(specifiedPath, TS_CONFIG);
    const tsconfigStats = statSync(TS_CONFIG);
    if (isFile(tsconfigStats)) {
      return tsconfigPath;
    }
    throw new TypeError(`Cannot find ${TS_CONFIG} file at the specified directory: ${specifiedPath}`);
  }
  throw new TypeError(`The specified file does not exist: ${specifiedPath}`);
}
