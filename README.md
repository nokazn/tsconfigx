# tsconfigx

[![CI](https://github.com/nokazn/tsconfigx/actions/workflows/static-check.yml/badge.svg)](https://github.com/nokazn/tsconfigx/actions/workflows/static-check.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Resolve TypeScript configuration files in tsc way.

## Installation

```bash
$ yarn add tsconfigx
```

or

```bash
$ npm i tsconfigx
```

## API

### `load` / `loadSync`

resolve a config file, read and parse the content asynchronously or synchronously.

`load(cwd: string, options?: LoadOptions): Promise<LoadResult>`  
`loadSync(cwd: string, options?: LoadOptions): LoadResult`

- `cwd` - path to a config file or a directory
- `options`

  - `fileName` - custom config file name (`tsconfig.json` by default )
  - `recursive` - if true, search parent directories recursively (`true` by default)
  - `extends` - if true, resolve extended config files (`true` by default)

### `resolve` / `resolveSync`

Resolve path to a config file.

`resolve(cwd: string, options?: Options): Promise<string>`  
`resolveSync(cwd: string, options?: Options): string`

- `cwd` - path to a config file or a directory
- `options`
  - `fileName` - custom config file name (`tsconfig.json` by default )
  - `recursive` - if true, search parent directories recursively (`true` by default)

### `parse`

Parse JSON with comments content as a JavaScript object. Comments and trailing commas are allowed.

`parse(jsonc: string): ConfigOptions`

## License

MIT
