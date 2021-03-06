import { parse } from './parse';
import { readFile, readFileSync } from './readFile';
import { extendedTsconfigPath, hasExtendsProp, normalizeJsonFileName, mergeConfig } from './utils';
import type { ReadFileOptions, LoadOptions, ConfigOptions } from './types';

type History = Record<string, number>;
interface ExtendedLoadOptions extends ReadFileOptions, LoadOptions {
  /** @description child tsconfig.json file */
  child?: string;
  /** @description for detecting circular dependency in `extends` */
  history?: History;
}

function appendHistory(history: History | undefined, filePath: string): History {
  const MAX_EXTENDED_PATH_COUNT = 3;
  const extendedPathCount = history?.[filePath] ?? 0;
  if (extendedPathCount > MAX_EXTENDED_PATH_COUNT) {
    throw new Error('Circular dependency in extends property is detected.');
  }
  return {
    ...history,
    [filePath]: extendedPathCount + 1,
  };
}

function noEntryErrorMessage(err: Error, child?: string): string {
  if (err.message.startsWith('ENOENT: ') && child != null) {
    return `${err.message}, which is specified in '${child}'`;
  }
  return err.message;
}

export async function extendedLoad(
  basePath: string,
  relativePath?: string,
  options?: ExtendedLoadOptions,
): Promise<ConfigOptions> {
  const trackExtendsProp = options?.extends ?? true;
  const tsconfigPath = normalizeJsonFileName(extendedTsconfigPath(basePath, relativePath));
  const raw = await readFile(tsconfigPath, options).catch((err: Error) => {
    throw new TypeError(noEntryErrorMessage(err, options?.child));
  });
  const config = parse(raw);
  if (trackExtendsProp && hasExtendsProp(config)) {
    const history = appendHistory(options?.history, tsconfigPath);
    const baseConfig = await extendedLoad(tsconfigPath, config.extends, {
      ...options,
      child: basePath,
      history,
    });
    return mergeConfig(baseConfig, config);
  }
  return config;
}

export function extendedLoadSync(
  basePath: string,
  relativePath?: string,
  options?: ExtendedLoadOptions,
): ConfigOptions {
  const trackExtendsProp = options?.extends ?? true;
  const tsconfigPath = normalizeJsonFileName(extendedTsconfigPath(basePath, relativePath));
  let raw: string;
  try {
    raw = readFileSync(tsconfigPath, options);
  } catch (err) {
    throw new TypeError(noEntryErrorMessage(err as Error, options?.child));
  }
  const config = parse(raw);
  if (trackExtendsProp && hasExtendsProp(config)) {
    const history = appendHistory(options?.history, tsconfigPath);
    const baseConfig = extendedLoadSync(tsconfigPath, config.extends, {
      ...options,
      child: basePath,
      history,
    });
    return mergeConfig(baseConfig, config);
  }
  return config;
}
