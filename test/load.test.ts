/* eslint-disable @typescript-eslint/no-floating-promises */
import { load } from '~/load';
import { relativePath } from './utils';

describe('load', () => {
  describe('normal', () => {
    it('cwd is specified as a file', () => {
      expect(load(relativePath('fixtures/normal/tsconfig.json'))).resolves.toEqual({
        path: relativePath('fixtures/normal/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
        },
      });
    });

    it('cwd is specified as a file with a different name', () => {
      expect(load(relativePath('fixtures/normal/tsconfig.build.json'))).resolves.toEqual({
        path: relativePath('fixtures/normal/tsconfig.build.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            declaration: true,
          },
        },
      });
    });

    it('A file name is specified in options', () => {
      expect(
        load(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.json',
        }),
      ).resolves.toEqual({
        path: relativePath('fixtures/normal/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
        },
      });
    });

    it('A different file name is specified in options', () => {
      expect(
        load(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toEqual({
        path: relativePath('fixtures/normal/tsconfig.build.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            declaration: true,
          },
        },
      });
    });

    it('cwd is specified as a directory', () => {
      expect(load(relativePath('fixtures/normal'))).resolves.toEqual({
        path: relativePath('fixtures/normal/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
        },
      });
    });
  });

  describe('set recursive option to true in a nested directory', () => {
    it('cwd is specified as a directory in nested/1', () => {
      expect(load(relativePath('fixtures/nested/1'))).resolves.toEqual({
        path: relativePath('fixtures/nested/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
        },
      });
    });

    // eslint-disable-next-line @typescript-eslint/require-await
    it('A different file name is specified in options in nested/1', async () => {
      expect(
        load(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toEqual({
        path: relativePath('fixtures/nested/tsconfig.build.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            declaration: true,
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      expect(load(relativePath('fixtures/nested/1/2/'))).resolves.toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toEqual({
        path: relativePath('fixtures/nested/tsconfig.build.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            declaration: true,
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2/3', () => {
      expect(load(relativePath('fixtures/nested/1/2/3'))).resolves.toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2/3', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toEqual({
        path: relativePath('fixtures/nested/tsconfig.build.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            declaration: true,
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      expect(load(relativePath('fixtures/nested/1/2/3/4'))).resolves.toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2/3/4', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toEqual({
        path: relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            declaration: true,
          },
        },
      });
    });
  });

  describe('set recursive option to false in a nested directory', () => {
    it('cwd is specified as a directory in nested/1', () => {
      expect(load(relativePath('fixtures/nested/1'), { recursive: false })).rejects.toThrow(
        /The specified file does not exist: /,
      );
    });

    it('A different file name is specified in options in nested/1', () => {
      expect(
        load(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).rejects.toThrow(/The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      expect(load(relativePath('fixtures/nested/1/2/'), { recursive: false })).resolves.toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).rejects.toThrow(/The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2/3', () => {
      expect(load(relativePath('fixtures/nested/1/2/3'), { recursive: false })).rejects.toThrow(
        /The specified file does not exist: /,
      );
    });

    it('A different file name is specified in options in nested/1/2/3', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).rejects.toThrow(/The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      expect(load(relativePath('fixtures/nested/1/2/3/4'), { recursive: false })).rejects.toThrow(
        /The specified file does not exist: /,
      );
    });

    it('A different file name is specified in options in nested/1/2/3/4', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).resolves.toEqual({
        path: relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'),
        config: {
          compilerOptions: {
            target: 'es5',
            module: 'commonjs',
            strict: true,
            noEmit: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            declaration: true,
          },
        },
      });
    });
  });

  describe('invalid', () => {
    it('An invalid file name is specified in cwd', () => {
      expect(load(relativePath('fixtures/normal/invalid-tsconfig.json'))).rejects.toThrow(
        /Cannot find invalid-tsconfig\.json file at the specified directory: /,
      );
    });
    it('An invalid file name is specified in options', () => {
      expect(
        load(relativePath('fixtures/normal'), {
          fileName: 'invalid-tsconfig.json',
        }),
      ).rejects.toThrow(/Cannot find invalid-tsconfig\.json file at the specified directory: /);
    });
    it('An empty file name is specified in options', () => {
      expect(
        load(relativePath('fixtures/normal'), {
          fileName: '',
        }),
      ).rejects.toThrow(/The specified file does not exist, but a directory exists: /);
    });
    it('An invalid way of specifying directory in options', () => {
      expect(
        // @ts-expect-error
        load(relativePath('fixtures'), {
          fileName: 'normal',
        }),
      ).rejects.toThrow(/The specified file does not exist, but a directory exists: /);
    });
  });
});
