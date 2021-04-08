import * as fs from 'fs';
import type { Stats } from 'fs';
import { promisify } from 'util';

export function stat(filePath: string): Promise<Stats> {
  return promisify<Stats>(() =>
    fs.stat(filePath, (err, stats) => {
      if (err != null) {
        throw err;
      }
      return stats;
    }),
  )();
}

export function statSync(filePath: string): Stats {
  return fs.statSync(filePath);
}

export function isFile(stats: Stats) {
  return stats.isFile() || stats.isFIFO();
}

export function isDir(stats: Stats) {
  return stats.isDirectory();
}
