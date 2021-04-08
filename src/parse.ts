import stripBom from 'strip-bom';
import stripJsonComments from 'strip-json-comments';
import stripJsonTrailingCommas from 'strip-json-trailing-commas';

// TODO: Return type
export function parse(jsonc: string): object {
  const json = stripJsonTrailingCommas(stripJsonComments(stripBom(jsonc)));
  return /^\s*$/.test(json) ? {} : JSON.parse(json);
}
