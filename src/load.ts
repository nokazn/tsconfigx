import { resolve, resolveSync } from '~/resolve';
import { extendedLoad, extendedLoadSync } from '~/extends';
import { LoadOptions, ConfigOptions } from '~/types';

interface LoadResult {
  path: string;
  config: ConfigOptions;
}

export async function load(cwd: string, options?: LoadOptions): Promise<LoadResult> {
  const path = await resolve(cwd, options);
  const config = await extendedLoad(path);
  return {
    path,
    config,
  };
}

export function loadSync(cwd: string, options?: LoadOptions): LoadResult {
  const path = resolveSync(cwd, options);
  const config = extendedLoadSync(path);
  return {
    path,
    config,
  };
}
