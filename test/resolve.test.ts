/* eslint-disable @typescript-eslint/no-floating-promises */
import { resolve } from '~/resolve';
import { relativePath } from './utils';

describe('resolve', () => {
  describe('normal', () => {
    it('cwd is specified as a file', () => {
      expect(resolve(relativePath('fixtures/normal/tsconfig.json'))).resolves.toBe(
        relativePath('fixtures/normal/tsconfig.json'),
      );
    });

    it('cwd is specified as a file with a different name', () => {
      expect(resolve(relativePath('fixtures/normal/tsconfig.build.json'))).resolves.toBe(
        relativePath('fixtures/normal/tsconfig.build.json'),
      );
    });

    it('A file name is specified in options', () => {
      expect(
        resolve(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.json',
        }),
      ).resolves.toBe(relativePath('fixtures/normal/tsconfig.json'));
    });

    it('A different file name is specified in options', () => {
      expect(
        resolve(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toBe(relativePath('fixtures/normal/tsconfig.build.json'));
    });

    it('cwd is specified as a directory', () => {
      expect(resolve(relativePath('fixtures/normal'))).resolves.toBe(
        relativePath('fixtures/normal/tsconfig.json'),
      );
    });
  });

  describe('set recursive option to true in a nested directory', () => {
    it('cwd is specified as a directory in nested/1', () => {
      expect(resolve(relativePath('fixtures/nested/1'))).resolves.toBe(
        relativePath('fixtures/nested/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1', () => {
      expect(
        resolve(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toBe(relativePath('fixtures/nested/tsconfig.build.json'));
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      expect(resolve(relativePath('fixtures/nested/1/2/'))).resolves.toBe(
        relativePath('fixtures/nested/1/2/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1/2', () => {
      expect(
        resolve(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toBe(relativePath('fixtures/nested/tsconfig.build.json'));
    });

    it('cwd is specified as a directory in nested/1/2/3', () => {
      expect(resolve(relativePath('fixtures/nested/1/2/3'))).resolves.toBe(
        relativePath('fixtures/nested/1/2/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1/2/3', () => {
      expect(
        resolve(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toBe(relativePath('fixtures/nested/tsconfig.build.json'));
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      expect(resolve(relativePath('fixtures/nested/1/2/3/4'))).resolves.toBe(
        relativePath('fixtures/nested/1/2/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1/2/3/4', () => {
      expect(
        resolve(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toBe(relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'));
    });
  });

  describe('set recursive option to false in a nested directory', () => {
    it('cwd is specified as a directory in nested/1', () => {
      expect(resolve(relativePath('fixtures/nested/1'), { recursive: false })).rejects.toThrow(
        /The specified file does not exist: /,
      );
    });

    it('A different file name is specified in options in nested/1', () => {
      expect(
        resolve(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).rejects.toThrow(/^The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      expect(resolve(relativePath('fixtures/nested/1/2/'), { recursive: false })).resolves.toBe(
        relativePath('fixtures/nested/1/2/tsconfig.json'),
      );
    });

    it('A different file name is specified in options in nested/1/2', () => {
      expect(
        resolve(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).rejects.toThrow(/^The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2/3', () => {
      expect(resolve(relativePath('fixtures/nested/1/2/3'), { recursive: false })).rejects.toThrow(
        /The specified file does not exist: /,
      );
    });

    it('A different file name is specified in options in nested/1/2/3', () => {
      expect(
        resolve(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).rejects.toThrow(/^The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      expect(
        resolve(relativePath('fixtures/nested/1/2/3/4'), { recursive: false }),
      ).rejects.toThrow(/^The specified file does not exist: /);
    });

    it('A different file name is specified in options in nested/1/2/3/4', () => {
      expect(
        resolve(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).resolves.toBe(relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'));
    });
  });

  describe('invalid', () => {
    it('An invalid file name is specified in cwd', () => {
      expect(resolve(relativePath('fixtures/normal/invalid-tsconfig.json'))).rejects.toThrow(
        /Cannot find invalid-tsconfig\.json file at the specified directory: /,
      );
    });
    it('An invalid file name is specified in options', () => {
      expect(
        resolve(relativePath('fixtures/normal'), {
          fileName: 'invalid-tsconfig.json',
        }),
      ).rejects.toThrow(/^Cannot find invalid-tsconfig\.json file at the specified directory: /);
    });
    it('An empty file name is specified in options', () => {
      expect(
        resolve(relativePath('fixtures/normal'), {
          fileName: '',
        }),
      ).rejects.toThrow(/^The specified file does not exist, but a directory exists: /);
    });
    it('An invalid way of specifying directory in options', () => {
      expect(
        // @ts-expect-error
        resolve(relativePath('fixtures'), {
          fileName: 'normal',
        }),
      ).rejects.toThrow(/^The specified file does not exist, but a directory exists: /);
    });
  });
});
