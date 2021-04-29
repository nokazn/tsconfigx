import * as path from 'path';

type FixtureType =
  | 'normal'
  | 'different'
  | 'nested'
  | 'invalid-extends'
  | 'extends-from-npm-package'
  | 'circular';
export type FixturesPath = `fixtures/${FixtureType}` | `fixtures/${FixtureType}/${string}`;

export const relativePath = (p: FixturesPath) => path.join(__dirname, p);
