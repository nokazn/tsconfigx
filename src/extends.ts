import merge from 'just-extend';

import { parse } from '~/parse';
import { readFile, readFileSync } from '~/readFile';
import { extendedTsconfigPath, hasExtendsProp, normalizeJsonFileName } from '~/utils';
import type { ReadFileOptions, LoadOptions, ConfigOptions } from '~/types';

interface ExtendedLoadOptions extends ReadFileOptions, LoadOptions {
  /**
   * child tsconfig.json file
   */
  child?: string;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { extends: extendsProp, references: _references, ...restConfig } = config;
    const baseConfig = await extendedLoad(tsconfigPath, extendsProp, {
      ...options,
      child: basePath,
    });
    return merge(true, baseConfig, restConfig);
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
    throw new TypeError(noEntryErrorMessage(err, options?.child));
  }
  const config = parse(raw);
  if (trackExtendsProp && hasExtendsProp(config)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { extends: extendsProp, references: _references, ...restConfig } = config;
    const baseConfig = extendedLoadSync(tsconfigPath, extendsProp, {
      ...options,
      child: basePath,
    });
    return merge(true, baseConfig, restConfig);
  }
  return config;
}
