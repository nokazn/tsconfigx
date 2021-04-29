import stripBom from 'strip-bom';
import stripJsonComments from 'strip-json-comments';
import stripJsonTrailingCommas from 'strip-json-trailing-commas';
import type { ConfigOptions } from './types';

/**
 * Parse JSON with comments content as a JavaScript object.
 * @param {string} jsonc - JSON with comments contents
 * @returns {object} parsed object
 */
export function parse(jsonc: string): ConfigOptions {
  const json = stripJsonTrailingCommas(stripJsonComments(stripBom(jsonc)));
  return /^\s*$/.test(json) ? {} : JSON.parse(json);
}
