export interface Options {
  fileName?: string;
  recursive?: boolean;
}

export interface ReadFileOptions {
  encoding?: BufferEncoding;
}

export interface LoadOptions extends Options {
  extends?: boolean;
}

export type ConfigOptions = object;
