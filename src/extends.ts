import * as path from 'path';
import merge from 'just-extend';

import { parse } from '~/parse';
import { readFile, readFileSync } from '~/readFile';
import { hasExtendsProp } from '~/utils';
import type { ReadFileOptions, LoadOptions, ConfigOptions } from '~/types';

interface ExtendedLoadOptions extends ReadFileOptions, LoadOptions {}

export async function extendedLoad(
  basePath: string,
  relativePath?: string,
  options?: ExtendedLoadOptions,
): Promise<ConfigOptions> {
  const trackExtendsProp = options?.extends ?? true;
  const tsconfigPath =
    relativePath != null ? path.join(path.dirname(basePath), relativePath) : basePath;
  const config = parse(await readFile(tsconfigPath, options));
  if (trackExtendsProp && hasExtendsProp(config)) {
    const { extends: extendsProp, ...restConfig } = config;
    const baseConfig = await extendedLoad(tsconfigPath, extendsProp, options);
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
  const tsconfigPath =
    relativePath != null ? path.join(path.dirname(basePath), relativePath) : basePath;
  const config = parse(readFileSync(tsconfigPath, options));
  if (trackExtendsProp && hasExtendsProp(config)) {
    const { extends: extendsProp, ...restConfig } = config;
    const baseConfig = extendedLoadSync(tsconfigPath, extendsProp, options);
    return merge(true, baseConfig, restConfig);
  }
  return config;
}
