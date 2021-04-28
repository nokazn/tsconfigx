import * as path from 'path';
import { stat, statSync, isFile, isDir, isJson } from './utils';
import { Options } from '~/types';

const TS_CONFIG = 'tsconfig.json';

/**
 * Resolve a configuration file, like `tsc`.
 * @param {string} - path to tsconfig.json or context
 * @return {string} - path to tsconfig.json
 */
export async function resolve(cwd: string, options?: Options): Promise<string> {
  const recursive = options?.recursive ?? true;
  const specifiedFileName = options?.fileName;
  // fileName is specified
  if (specifiedFileName != null) {
    const specifiedPath = path.resolve(cwd, specifiedFileName);
    return stat(specifiedPath).then((stats) => {
      if (stats != null) {
        // cwd includes a file or options.fileName is specified, and stats is file
        if (isFile(stats)) {
          return specifiedPath;
        }
        // cwd indicates a directory or options.fileName is specified, and stats is directory
        if (isDir(stats)) {
          throw new TypeError(
            `The specified file does not exist, but a directory exists: ${specifiedPath}`,
          );
        }
      }
      if (recursive) {
        const parentDir = path.dirname(cwd);
        // cwd is not root directory
        if (parentDir !== cwd) {
          return resolve(parentDir, options);
        }
        throw new TypeError(
          `Cannot find ${specifiedFileName} file at the specified directory: ${cwd}`,
        );
      }
      throw new TypeError(`The specified file does not exist: ${specifiedPath}`);
    });
  }

  return stat(cwd).then((stats) => {
    if (stats != null) {
      // cwd includes a file or options.fileName is specified, and stats is file
      if (isFile(stats)) {
        return cwd;
      }
      // cwd indicates a directory or options.fileName is specified, and stats is directory
      if (isDir(stats)) {
        return resolve(cwd, { ...options, fileName: TS_CONFIG });
      }
    }
    // search recursively
    if (recursive) {
      const parentDir = path.dirname(cwd);
      const fileName = isJson(cwd) ? path.basename(cwd) : TS_CONFIG;
      // cwd is not root directory
      if (parentDir !== cwd) {
        return resolve(parentDir, { ...options, fileName });
      }
      throw new TypeError(`Cannot find ${fileName} file at the specified directory: ${cwd}`);
    }
    throw new TypeError(`The specified file does not exist: ${cwd}`);
  });
}

/**
 * Synchronously resolve a configuration file, like `tsc`.
 * @param {string} - path to tsconfig.json or context
 * @return {string} - path to tsconfig.json
 */
export function resolveSync(cwd: string, options?: Options): string {
  const recursive = options?.recursive ?? true;
  const specifiedFileName = options?.fileName;
  // fileName is specified
  if (specifiedFileName != null) {
    const specifiedPath = path.resolve(cwd, specifiedFileName);
    const stats = statSync(specifiedPath);
    if (stats != null) {
      // cwd indicates a file or options.fileName is specified, and stats is file
      if (isFile(stats)) {
        return specifiedPath;
      }
      // cwd indicates a directory or options.fileName is specified, and stats is directory
      if (isDir(stats)) {
        throw new TypeError(
          `The specified file does not exist, but a directory exists: ${specifiedPath}`,
        );
      }
    }
    if (recursive) {
      const parentDir = path.dirname(cwd);
      // cwd is not root directory
      if (parentDir !== cwd) {
        return resolveSync(parentDir, options);
      }
      throw new TypeError(
        `Cannot find ${specifiedFileName} file at the specified directory: ${cwd}`,
      );
    }
    throw new TypeError(`The specified file does not exist: ${specifiedPath}`);
  }

  const stats = statSync(cwd);
  if (stats != null) {
    // cwd indicates a file or options.fileName is specified, and stats is file
    if (isFile(stats)) {
      return cwd;
    }
    // cwd indicates a directory or options.fileName is specified, and stats is directory
    if (isDir(stats)) {
      return resolveSync(cwd, {
        ...options,
        fileName: TS_CONFIG,
      });
    }
  }
  // search recursively
  if (recursive) {
    const parentDir = path.dirname(cwd);
    const fileName = isJson(cwd) ? path.basename(cwd) : TS_CONFIG;
    // cwd is not root directory
    if (parentDir !== cwd) {
      return resolveSync(parentDir, { ...options, fileName });
    }
    throw new TypeError(`Cannot find ${fileName} file at the specified directory: ${cwd}`);
  }
  throw new TypeError(`The specified file does not exist: ${cwd}`);
}
