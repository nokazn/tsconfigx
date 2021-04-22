import { resolve, resolveSync } from '~/resolve';
import { readFile, readFileSync } from '~/utils';
import { Options } from '~/constants';

interface LoadResult {
  path: string;
  // TODO
  config: any;
}

export async function load(cwd: string, options?: Options): Promise<LoadResult> {
  const path = await resolve(cwd, options);
  const config = await readFile(path);
  return {
    path,
    config,
  };
}

export function loadSync(cwd: string, options?: Options): LoadResult {
  const path = resolveSync(cwd, options);
  const config = readFileSync(path);
  return {
    path,
    config,
  };
}
