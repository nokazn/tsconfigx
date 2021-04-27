import * as fs from 'fs';
import { promisify } from 'util';
import type { ReadFileOptions } from '~/types';

const defaultReadFileOptions: ReadFileOptions = {
  encoding: 'utf-8',
};

export function readFile(
  filePath: string,
  options: ReadFileOptions = defaultReadFileOptions,
): Promise<string> {
  return promisify(fs.readFile)(filePath, options).then((content) =>
    typeof content === 'string' ? content : content.toString('utf-8'),
  );
}

export function readFileSync(
  filePath: string,
  options: ReadFileOptions = defaultReadFileOptions,
): string {
  const content = fs.readFileSync(filePath, options);
  return typeof content !== 'string' ? content.toString('utf-8') : content;
}
