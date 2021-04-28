import { resolve, resolveSync } from '~/resolve';
import { extendedLoad, extendedLoadSync } from '~/extends';
import { LoadOptions, ConfigOptions } from '~/types';

interface LoadResult {
  path: string;
  config: ConfigOptions;
}

/**
 * Resolve a config file, read and parse the content.
 * @param {string} cwd - path to a config file or a directory
 * @param {object} options
 * @return {string} path to a config file and parsed config
 */
export async function load(cwd: string, options?: LoadOptions): Promise<LoadResult> {
  const path = await resolve(cwd, options);
  const config = await extendedLoad(path, undefined, options);
  return {
    path,
    config,
  };
}

/**
 * Synchronously resolve a config file, read and parse the content.
 * @param {string} cwd - path to a config file or directory
 * @param {object} options
 * @return {string} path to a config file and parsed config
 */
export function loadSync(cwd: string, options?: LoadOptions): LoadResult {
  const path = resolveSync(cwd, options);
  const config = extendedLoadSync(path, undefined, options);
  return {
    path,
    config,
  };
}
