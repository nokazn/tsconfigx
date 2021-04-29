/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  existPathAsDir,
  existPathAsDirSync,
  extendedTsconfigPath,
  hasExtendsProp,
  hasProp,
  mergeConfig,
  normalizeJsonFileName,
} from '~/utils';
import { projectRootPath, relativePath } from './test-utils';

describe('utils/existPathAsDir', () => {
  it('valid path', () => {
    expect(existPathAsDir(projectRootPath('test'))).resolves.toBe(true);
  });

  it('invalid path', () => {
    expect(existPathAsDir(projectRootPath('tests'))).resolves.toBe(false);
  });
});

describe('utils/existPathAsDirSync', () => {
  it('valid path', () => {
    expect(existPathAsDirSync(projectRootPath('test'))).toBe(true);
  });

  it('invalid path', () => {
    expect(existPathAsDirSync(projectRootPath('tests'))).toBe(false);
  });
});

describe('utils/extendedTsconfigPath', () => {
  it('to is undefined', () => {
    expect(extendedTsconfigPath(relativePath('fixtures/normal/tsconfig.json'), undefined)).toBe(
      relativePath('fixtures/normal/tsconfig.json'),
    );
  });

  it('to is relative', () => {
    expect(
      extendedTsconfigPath(
        relativePath('fixtures/normal/tsconfig.json'),
        '../different/tsconfig.json',
      ),
    ).toBe(relativePath('fixtures/different/tsconfig.json'));
    expect(
      extendedTsconfigPath(relativePath('fixtures/normal/tsconfig.build.json'), './tsconfig.json'),
    ).toBe(relativePath('fixtures/normal/tsconfig.json'));
  });

  it('to is path to a npm package', () => {
    expect(
      extendedTsconfigPath(
        relativePath('fixtures/extends-from-npm-package/tsconfig.json'),
        '@tsconfig/recommended/tsconfig.json',
      ),
    ).toBe(projectRootPath('node_modules/@tsconfig/recommended/tsconfig.json'));
    expect(
      extendedTsconfigPath(
        relativePath('fixtures/extends-from-npm-package/tsconfig.json'),
        '/@tsconfig/recommended/tsconfig.json',
      ),
    ).toBe(projectRootPath('node_modules/@tsconfig/recommended/tsconfig.json'));
    expect(
      extendedTsconfigPath(
        relativePath('fixtures/extends-from-npm-package/tsconfig.json'),
        '////@tsconfig/recommended/tsconfig.json',
      ),
    ).toBe(projectRootPath('node_modules/@tsconfig/recommended/tsconfig.json'));
  });
});

describe('utils/hasExtendsProp', () => {
  it('with or without extends prop', () => {
    expect(hasExtendsProp({})).toBe(false);
    // @ts-expect-error
    expect(hasExtendsProp({ extends: {} })).toBe(false);
    expect(hasExtendsProp({ extends: '' })).toBe(true);
  });
});

describe('utils/hasProp', () => {
  it('with or without prop', () => {
    expect(hasProp({}, 'key')).toBe(false);
    expect(hasProp(undefined, 'key')).toBe(false);
    expect(hasProp(null, 'key')).toBe(false);
    expect(hasProp({ key: {} }, 'key')).toBe(true);
  });
});

describe('utils/mergeConfig', () => {
  it('merge', () => {
    expect(
      mergeConfig(
        {
          compileOnSave: false,
          compilerOptions: {
            allowJs: false,
            checkJs: false,
          },
          exclude: ['node_modules'],
          include: ['src'],
        },
        {
          compileOnSave: true,
          compilerOptions: {
            allowJs: true,
            allowSyntheticDefaultImports: false,
            checkJs: false,
          },
          include: ['test'],
        },
      ),
    ).toEqual({
      compileOnSave: true,
      compilerOptions: {
        allowJs: true,
        allowSyntheticDefaultImports: false,
        checkJs: false,
      },
      exclude: ['node_modules'],
      include: ['test'],
    });
    expect(mergeConfig({}, {})).toEqual({});
  });

  it('strip references & extends prop ', () => {
    expect(mergeConfig({ references: [{ path: 'src' }] }, { extends: './tsconfig.json' })).toEqual(
      {},
    );
  });
  expect(
    mergeConfig(
      {
        extends: './tsconfig.json',
        references: [{ path: 'src' }],
      },
      {
        extends: './tsconfig.build.json',
        references: [{ path: 'test' }],
      },
    ),
  ).toEqual({
    extends: './tsconfig.json',
    references: [{ path: 'test' }],
  });
});

describe('utils/normalizeJsonFileName', () => {
  it('normalize JSON file name', () => {
    expect(normalizeJsonFileName('./tsconfig.json')).toBe('./tsconfig.json');
    expect(normalizeJsonFileName('./tsconfig')).toBe('./tsconfig.json');
  });
});
