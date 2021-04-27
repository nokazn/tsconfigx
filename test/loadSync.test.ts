import { loadSync } from '~/load';
import { relativePath } from './utils';

describe('loadSync', () => {
  describe('normal', () => {
    it('cwd is specified as a file', () => {
      expect(loadSync(relativePath('fixtures/normal/tsconfig.json'))).toEqual({
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
      expect(loadSync(relativePath('fixtures/normal/tsconfig.build.json'))).toEqual({
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

    it('cwd is specified as a file with a different name, and extends option is set to false', () => {
      expect(
        loadSync(relativePath('fixtures/normal/tsconfig.build.json'), {
          extends: false,
        }),
      ).toEqual({
        path: relativePath('fixtures/normal/tsconfig.build.json'),
        config: {
          extends: './tsconfig.json',
          compilerOptions: {
            noEmit: false,
            declaration: true,
          },
        },
      });
    });

    it('A file name is specified in options', () => {
      expect(
        loadSync(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.json',
        }),
      ).toEqual({
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
        loadSync(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toEqual({
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

    it('A different file name is specified in options, and extends option is set to false', () => {
      expect(
        loadSync(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).toEqual({
        path: relativePath('fixtures/normal/tsconfig.build.json'),
        config: {
          extends: './tsconfig.json',
          compilerOptions: {
            noEmit: false,
            declaration: true,
          },
        },
      });
    });

    it('cwd is specified as a directory', () => {
      expect(loadSync(relativePath('fixtures/normal'))).toEqual({
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
      expect(loadSync(relativePath('fixtures/nested/1'))).toEqual({
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

    it('A different file name is specified in options in nested/1', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toEqual({
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

    it('A different file name is specified in options in nested/1, and extends option is set to false', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).toEqual({
        path: relativePath('fixtures/nested/tsconfig.build.json'),
        config: {
          extends: './tsconfig.json',
          compilerOptions: {
            noEmit: false,
            declaration: true,
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      expect(loadSync(relativePath('fixtures/nested/1/2/'))).toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            moduleResolution: 'node',
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2, and extends option is set to false', () => {
      expect(loadSync(relativePath('fixtures/nested/1/2/'), { extends: false })).toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          extends: '../../tsconfig.json',
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            moduleResolution: 'node',
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toEqual({
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

    it('A different file name is specified in options in nested/1/2, and extends option is set to false', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).toEqual({
        path: relativePath('fixtures/nested/tsconfig.build.json'),
        config: {
          extends: './tsconfig.json',
          compilerOptions: {
            noEmit: false,
            declaration: true,
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2/3', () => {
      expect(loadSync(relativePath('fixtures/nested/1/2/3'))).toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            moduleResolution: 'node',
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2/3, and extends option is set to false', () => {
      expect(loadSync(relativePath('fixtures/nested/1/2/3'), { extends: false })).toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          extends: '../../tsconfig.json',
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            moduleResolution: 'node',
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2/3', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toEqual({
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

    it('A different file name is specified in options in nested/1/2/3, and extends option is set to false', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).toEqual({
        path: relativePath('fixtures/nested/tsconfig.build.json'),
        config: {
          extends: './tsconfig.json',
          compilerOptions: {
            noEmit: false,
            declaration: true,
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      expect(loadSync(relativePath('fixtures/nested/1/2/3/4'))).toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            moduleResolution: 'node',
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2/3/4, and extends option is set to false', () => {
      expect(loadSync(relativePath('fixtures/nested/1/2/3/4'), { extends: false })).toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          extends: '../../tsconfig.json',
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            moduleResolution: 'node',
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2/3/4', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toEqual({
        path: relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'),
        config: {
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            strict: true,
            noEmit: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            moduleResolution: 'node',
            declaration: true,
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2/3/4, and extends option is set to false', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).toEqual({
        path: relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'),
        config: {
          extends: '../../tsconfig.json',
          compilerOptions: {
            noEmit: false,
            declaration: true,
          },
        },
      });
    });
  });

  describe('set recursive option to false in a nested directory', () => {
    it('cwd is specified as a directory in nested/1', () => {
      expect(() => loadSync(relativePath('fixtures/nested/1'), { recursive: false })).toThrow(
        /The specified file does not exist: /,
      );
    });

    it('A different file name is specified in options in nested/1', () => {
      expect(() =>
        loadSync(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).toThrow(/^The specified file does not exist: /);
    });

    it('A different file name is specified in options in nested/1, and extends option is set to false', () => {
      expect(() =>
        loadSync(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
          extends: false,
        }),
      ).toThrow(/^The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      expect(loadSync(relativePath('fixtures/nested/1/2/'), { recursive: false })).toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            strict: true,
            noEmit: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            moduleResolution: 'node',
          },
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2, and extends option is set to false', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1/2/'), {
          recursive: false,
          extends: false,
        }),
      ).toEqual({
        path: relativePath('fixtures/nested/1/2/tsconfig.json'),
        config: {
          extends: '../../tsconfig.json',
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            moduleResolution: 'node',
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2', () => {
      expect(() =>
        loadSync(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).toThrow(/^The specified file does not exist: /);
    });

    it('A different file name is specified in options in nested/1/2, and extends option is set to false', () => {
      expect(() =>
        loadSync(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
          extends: false,
        }),
      ).toThrow(/^The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2/3', () => {
      expect(() => loadSync(relativePath('fixtures/nested/1/2/3'), { recursive: false })).toThrow(
        /The specified file does not exist: /,
      );
    });

    it('A different file name is specified in options in nested/1/2/3', () => {
      expect(() =>
        loadSync(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).toThrow(/^The specified file does not exist: /);
    });

    it('A different file name is specified in options in nested/1/2/3, and extends option is set to false', () => {
      expect(() =>
        loadSync(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
          extends: false,
        }),
      ).toThrow(/^The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      expect(() => loadSync(relativePath('fixtures/nested/1/2/3/4'), { recursive: false })).toThrow(
        /The specified file does not exist: /,
      );
    });

    it('A different file name is specified in options in nested/1/2/3/4', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).toEqual({
        path: relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'),
        config: {
          compilerOptions: {
            target: 'ES6',
            module: 'ESNEXT',
            strict: true,
            noEmit: false,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            moduleResolution: 'node',
            declaration: true,
          },
        },
      });
    });

    it('A different file name is specified in options in nested/1/2/3/4, and extends option is set to false', () => {
      expect(
        loadSync(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
          extends: false,
        }),
      ).toEqual({
        path: relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'),
        config: {
          extends: '../../tsconfig.json',
          compilerOptions: {
            noEmit: false,
            declaration: true,
          },
        },
      });
    });
  });

  describe('invalid', () => {
    it('An invalid file name is specified in cwd', () => {
      expect(() => loadSync(relativePath('fixtures/normal/invalid-tsconfig.json'))).toThrow(
        /Cannot find invalid-tsconfig\.json file at the specified directory: /,
      );
    });

    it('An invalid file name is specified in options', () => {
      expect(() =>
        loadSync(relativePath('fixtures/normal'), {
          fileName: 'invalid-tsconfig.json',
        }),
      ).toThrow(/^Cannot find invalid-tsconfig\.json file at the specified directory: /);
    });

    it('An empty file name is specified in options', () => {
      expect(() =>
        loadSync(relativePath('fixtures/normal'), {
          fileName: '',
        }),
      ).toThrow(/^The specified file does not exist, but a directory exists: /);
    });

    it('An invalid way of specifying directory in options', () => {
      expect(() =>
        // @ts-expect-error
        loadSync(relativePath('fixtures'), {
          fileName: 'normal',
        }),
      ).toThrow(/^The specified file does not exist, but a directory exists: /);
    });

    it('An invalid path in extends prop is specified', () => {
      expect(() =>
        loadSync(relativePath('fixtures/invalid-extends'), {
          fileName: 'tsconfig.build.json',
        }),
      ).toThrow(/^ENOENT: no such file or directory, open /);
    });
  });
});
