import { resolve, resolveSync } from '~/resolve';
import { parse } from '~/parse';
import { readFile, readFileSync } from '~/utils';
import { Options } from '~/constants';

interface LoadResult {
  path: string;
  origin: string;
  // TODO
  config: any;
}

export async function load(cwd: string, options?: Options): Promise<LoadResult> {
  const path = await resolve(cwd, options);
  const origin = await readFile(path);
  const config = parse(origin);
  return {
    path,
    origin,
    config,
  };
}

export function loadSync(cwd: string, options?: Options): LoadResult {
  const path = resolveSync(cwd, options);
  const origin = readFileSync(path);
  const config = parse(origin);
  return {
    path,
    origin,
    config,
  };
}
