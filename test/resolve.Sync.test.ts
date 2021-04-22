/* eslint-disable @typescript-eslint/no-floating-promises */
import * as path from 'path';
import { resolveSync } from '~/resolve';

type FixtureType = 'normal' | 'different' | 'nested';
type FixturesPath = `./fixtures/${FixtureType}` | `./fixtures/${FixtureType}/${string}`;
const relativePath = (p: FixturesPath) => path.join(__dirname, p);

describe('resolveSync', () => {
  describe('normal', () => {
    it('cwd is specified as a file', () => {
      expect(resolveSync(relativePath('./fixtures/normal/tsconfig.json'))).toBe(
        relativePath('./fixtures/normal/tsconfig.json'),
      );
    });

    it('cwd is specified as a file with a different name', () => {
      expect(resolveSync(relativePath('./fixtures/normal/tsconfig.build.json'))).toBe(
        relativePath('./fixtures/normal/tsconfig.build.json'),
      );
    });

    it('A file name is specified in options', () => {
      expect(
        resolveSync(relativePath('./fixtures/normal'), {
          fileName: 'tsconfig.json',
        }),
      ).toBe(relativePath('./fixtures/normal/tsconfig.json'));
    });

    it('A different file name is specified in options', () => {
      expect(
        resolveSync(relativePath('./fixtures/normal'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toBe(relativePath('./fixtures/normal/tsconfig.build.json'));
    });

    it('cwd is specified as a directory', () => {
      expect(resolveSync(relativePath('./fixtures/normal'))).toBe(
        relativePath('./fixtures/normal/tsconfig.json'),
      );
    });
  });

  describe('set recursive option to true in a nested directory', () => {
    it('cwd is specified as a directory in nested/1', () => {
      expect(resolveSync(relativePath('./fixtures/nested/1'))).toBe(
        relativePath('./fixtures/nested/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1', () => {
      expect(
        resolveSync(relativePath('./fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toBe(relativePath('./fixtures/nested/tsconfig.build.json'));
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      expect(resolveSync(relativePath('./fixtures/nested/1/2/'))).toBe(
        relativePath('./fixtures/nested/1/2/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1/2', () => {
      expect(
        resolveSync(relativePath('./fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toBe(relativePath('./fixtures/nested/tsconfig.build.json'));
    });

    it('cwd is specified as a directory in nested/1/2/3', () => {
      expect(resolveSync(relativePath('./fixtures/nested/1/2/3'))).toBe(
        relativePath('./fixtures/nested/1/2/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1/2/3', () => {
      expect(
        resolveSync(relativePath('./fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toBe(relativePath('./fixtures/nested/tsconfig.build.json'));
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      expect(resolveSync(relativePath('./fixtures/nested/1/2/3/4'))).toBe(
        relativePath('./fixtures/nested/1/2/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1/2/3/4', () => {
      expect(
        resolveSync(relativePath('./fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toBe(relativePath('./fixtures/nested/1/2/3/4/tsconfig.build.json'));
    });
  });

  describe('set recursive option to false in a nested directory', () => {
    it('cwd is specified as a directory in nested/1', () => {
      expect(() => resolveSync(relativePath('./fixtures/nested/1'), { recursive: false })).toThrow(
        /The specified file does not exist: /,
      );
    });

    it('A different file name is specified in options in nested/1', () => {
      expect(() =>
        resolveSync(relativePath('./fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).toThrow(/The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      expect(resolveSync(relativePath('./fixtures/nested/1/2/'), { recursive: false })).toBe(
        relativePath('./fixtures/nested/1/2/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1/2', () => {
      expect(() =>
        resolveSync(relativePath('./fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).toThrow(/The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2/3', () => {
      expect(() =>
        resolveSync(relativePath('./fixtures/nested/1/2/3'), { recursive: false }),
      ).toThrow(/The specified file does not exist: /);
    });

    it('A different file name is specified in options in nested/1/2/3', () => {
      expect(() =>
        resolveSync(relativePath('./fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).toThrow(/The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      expect(() =>
        resolveSync(relativePath('./fixtures/nested/1/2/3/4'), { recursive: false }),
      ).toThrow(/The specified file does not exist: /);
    });

    it('A different file name is specified in options in nested/1/2/3/4', () => {
      expect(
        resolveSync(relativePath('./fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).toBe(relativePath('./fixtures/nested/1/2/3/4/tsconfig.build.json'));
    });
  });

  describe('invalid', () => {
    it('An invalid file name is specified in cwd', () => {
      expect(() => resolveSync(relativePath('./fixtures/normal/invalid-tsconfig.json'))).toThrow(
        /Cannot find invalid-tsconfig\.json file at the specified directory: /,
      );
    });

    it('An invalid file name is specified in options', () => {
      expect(() =>
        resolveSync(relativePath('./fixtures/normal'), {
          fileName: 'invalid-tsconfig.json',
        }),
      ).toThrow(/Cannot find invalid-tsconfig\.json file at the specified directory: /);
    });

    it('An empty file name is specified in options', () => {
      expect(() =>
        resolveSync(relativePath('./fixtures/normal'), {
          fileName: '',
        }),
      ).toThrow(/The specified file does not exist, but a directory exists: /);
    });

    it('An invalid way of specifying directory in options', () => {
      expect(() =>
        // @ts-expect-error
        resolveSync(relativePath('./fixtures'), {
          fileName: 'normal',
        }),
      ).toThrow(/The specified file does not exist, but a directory exists: /);
    });
  });
});
