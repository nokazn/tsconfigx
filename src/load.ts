import { resolve, resolveSync } from '~/resolve';
import { parse } from '~/parse';
import { readFile, readFileSync } from '~/utils';
import { Options, ConfigOptions } from '~/types';

interface LoadOptions extends Options {
  extend?: boolean;
}

interface LoadResult {
  path: string;
  raw: string;
  config: ConfigOptions;
}

export async function load(cwd: string, options?: LoadOptions): Promise<LoadResult> {
  const path = await resolve(cwd, options);
  const raw = await readFile(path);
  const config = parse(raw);
  return {
    path,
    raw,
    config,
  };
}

export function loadSync(cwd: string, options?: LoadOptions): LoadResult {
  const path = resolveSync(cwd, options);
  const raw = readFileSync(path);
  const config = parse(raw);
  return {
    path,
    raw,
    config,
  };
}
