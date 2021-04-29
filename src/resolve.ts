import * as path from 'path';
import { stat, statSync, isFile, isDir, existPathAsDir, existPathAsDirSync } from './utils';
import { Options } from './types';

const TS_CONFIG = 'tsconfig.json';

interface ResolverOptions extends Options {
  extendsFrom?: string;
}

async function resolver(cwd: string, options?: ResolverOptions): Promise<string> {
  const recursive = options?.recursive ?? true;
  const specifiedFileName = options?.fileName;

  // `fileName` is specified
  if (specifiedFileName != null) {
    const specifiedPath = path.resolve(cwd, specifiedFileName);
    const ensuredSpecifiedPath = await stat(specifiedPath).then((stats) => {
      if (stats != null) {
        // `cwd` includes a file or `options.fileName` is specified, and stats is file
        if (isFile(stats)) {
          return specifiedPath;
        }
        // `cwd` indicates a directory or `options.fileName` is specified, and stats is directory
        if (isDir(stats)) {
          throw new TypeError(
            `The specified file does not exist, but a directory exists: ${specifiedPath}`,
          );
        }
      }
      return undefined;
    });
    if (ensuredSpecifiedPath != null) {
      return ensuredSpecifiedPath;
    }
    if (recursive) {
      const isCwdDir = await existPathAsDir(cwd);
      const parentDir = path.dirname(cwd);
      // cwd is a directory and not root
      if (isCwdDir && parentDir !== cwd) {
        return resolver(parentDir, {
          extendsFrom: cwd,
          ...options,
        });
      }
      throw new TypeError(
        `Cannot find ${specifiedFileName} file at the specified directory: ${
          options?.extendsFrom ?? cwd
        }`,
      );
    }
    throw new TypeError(`The specified file does not exist: ${specifiedPath}`);
  }

  return stat(cwd).then((stats) => {
    if (stats != null) {
      // `cwd` includes a file or `options.fileName` is specified, and stats is file
      if (isFile(stats)) {
        return cwd;
      }
      // `cwd` indicates a directory or `options.fileName` is specified, and stats is directory
      if (isDir(stats)) {
        return resolver(cwd, {
          ...options,
          fileName: TS_CONFIG,
        });
      }
    }
    // specify cwd as a file, and search recursively
    if (recursive) {
      const parentDir = path.dirname(cwd);
      // avoid to specify `fileName` as an empty string
      const fileName = path.basename(cwd) || undefined;
      // cwd is not root directory
      if (parentDir !== cwd) {
        return resolver(parentDir, {
          extendsFrom: parentDir,
          ...options,
          fileName,
        });
      }
      throw new TypeError(
        `Cannot find ${fileName ?? 'config'} file at the specified directory: ${
          options?.extendsFrom ?? cwd
        }`,
      );
    }
    throw new TypeError(`The specified file does not exist: ${cwd}`);
  });
}

/**
 * Resolve path to a config file.
 * @param {string} cwd - path to a config file or directory
 * @param {object} options
 * @return {string} path to a config
 */
export async function resolve(cwd?: string, options?: Options): Promise<string> {
  return resolver(cwd || './', options);
}

function resolverSync(cwd: string, options?: ResolverOptions): string {
  const recursive = options?.recursive ?? true;
  const specifiedFileName = options?.fileName;

  // fileName is specified
  if (specifiedFileName != null) {
    const specifiedPath = path.resolve(cwd, specifiedFileName);
    const stats = statSync(specifiedPath);
    if (stats != null) {
      // `cwd` indicates a file or `options.fileName` is specified, and stats is file
      if (isFile(stats)) {
        return specifiedPath;
      }
      // `cwd` indicates a directory or `options.fileName` is specified, and stats is directory
      if (isDir(stats)) {
        throw new TypeError(
          `The specified file does not exist, but a directory exists: ${specifiedPath}`,
        );
      }
    }
    if (recursive) {
      const isCwdDir = existPathAsDirSync(cwd);
      const parentDir = path.dirname(cwd);
      // `cwd` is a directory and not root
      if (isCwdDir && parentDir !== cwd) {
        return resolverSync(parentDir, {
          extendsFrom: cwd,
          ...options,
        });
      }
      throw new TypeError(
        `Cannot find ${specifiedFileName} file at the specified directory: ${
          options?.extendsFrom ?? cwd
        }`,
      );
    }
    throw new TypeError(`The specified file does not exist: ${specifiedPath}`);
  }

  const stats = statSync(cwd);
  if (stats != null) {
    // `cwd` indicates a file or `options.fileName` is specified, and stats is file
    if (isFile(stats)) {
      return cwd;
    }
    // `cwd` indicates a directory or `options.fileName` is specified, and stats is directory
    if (isDir(stats)) {
      return resolverSync(cwd, {
        ...options,
        fileName: TS_CONFIG,
      });
    }
  }
  // specify `cwd` as a file, and search recursively
  if (recursive) {
    const parentDir = path.dirname(cwd);
    // avoid to specify `fileName` as an empty string
    const fileName = path.basename(cwd) || undefined;
    // `cwd` is not root directory
    if (parentDir !== cwd) {
      return resolverSync(parentDir, {
        extendsFrom: parentDir,
        ...options,
        fileName,
      });
    }
    throw new TypeError(
      `Cannot find ${fileName ?? 'config'} file at the specified directory: ${
        options?.extendsFrom ?? cwd
      }`,
    );
  }
  throw new TypeError(`The specified file does not exist: ${cwd}`);
}

/**
 * Synchronously resolve path to a config file.
 * @param {string} cwd - path to a config file or directory
 * @param {object} options
 * @return {string} path to a config
 */
export function resolveSync(cwd?: string, options?: Options): string {
  return resolverSync(cwd || './', options);
}
