import stripBom from 'strip-bom';
import stripJsonComments from 'strip-json-comments';
import stripJsonTrailingCommas from 'strip-json-trailing-commas';
import type { ConfigOptions } from '~/types';

export function parse(jsonc: string): ConfigOptions {
  const json = stripJsonTrailingCommas(stripJsonComments(stripBom(jsonc)));
  return /^\s*$/.test(json) ? {} : JSON.parse(json);
}
