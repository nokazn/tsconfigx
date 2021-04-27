export interface Options {
  /**
   * @default 'tsconfig.json'
   */
  fileName?: string;

  /**
   * enable to search recursively parent directories.
   * @default true
   */
  recursive?: boolean;
}

export interface ReadFileOptions {
  /** @default 'utf-8' */
  encoding?: BufferEncoding;
}

export interface LoadOptions extends Options {
  /**
   * enable to track extended tsconfig.json file.
   * @default true
   */
  extends?: boolean;
}

export type ConfigOptions = object;
