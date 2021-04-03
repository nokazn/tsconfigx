import stripBom from 'strip-bom';
import * as JSONC from 'jsonc-parser';

// TODO: Return type
export function parse(content: string): object {
  const headlessContent = stripBom(content);
  return /^\s*$/.test(headlessContent) ? {} : JSONC.parse(headlessContent);
}
