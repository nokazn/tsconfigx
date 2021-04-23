import * as fs from 'fs';
import * as path from 'path';
import type { Stats } from 'fs';
import { promisify } from 'util';

interface ReadFileOptions {
  encoding?: BufferEncoding;
}

const defaultReadFileOptions: ReadFileOptions = {
  encoding: 'utf-8',
};

export function stat(filePath: string): Promise<Stats | undefined> {
  return promisify(fs.stat)(filePath).catch(() => undefined);
}

export function statSync(filePath: string): Stats | undefined {
  let stats: Stats | undefined;
  try {
    stats = fs.statSync(filePath);
  } catch (err: unknown) {
    stats = undefined;
  }
  return stats;
}

export function isFile(stats: Stats): boolean {
  return stats.isFile() || stats.isFIFO();
}

export function isDir(stats: Stats): boolean {
  return stats.isDirectory();
}

export function isJson(filePath: string): boolean {
  return /\.json$/.test(path.basename(filePath));
}

export function readFile(
  filePath: string,
  options: ReadFileOptions = defaultReadFileOptions,
): Promise<string> {
  return promisify(fs.readFile)(filePath, options).then((content) =>
    typeof content === 'string' ? content : content.toString('utf-8'),
  );
  // .catch(() => undefined);
}

export function readFileSync(
  filePath: string,
  options: ReadFileOptions = defaultReadFileOptions,
): string {
  const content = fs.readFileSync(filePath, options);
  return typeof content !== 'string' ? content.toString('utf-8') : content;
}
