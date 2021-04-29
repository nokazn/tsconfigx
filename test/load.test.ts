/* eslint-disable @typescript-eslint/no-floating-promises */
import { load } from '~/load';
import { relativePath } from './test-utils';

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

    it('cwd is specified as a file with a different name, and extends option is set to false', () => {
      expect(
        load(relativePath('fixtures/normal/tsconfig.build.json'), {
          extends: false,
        }),
      ).resolves.toEqual({
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

    it('cwd is specified as a file with a different name, and extends is specified without extension name', () => {
      expect(load(relativePath('fixtures/normal/tsconfig.no-extension.json'))).resolves.toEqual({
        path: relativePath('fixtures/normal/tsconfig.no-extension.json'),
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

    it('A different file name is specified in options, and extends option is set to false', () => {
      expect(
        load(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).resolves.toEqual({
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

    it('A different file name is specified in options, and extends is specified without extension name', () => {
      expect(
        load(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.no-extension.json',
        }),
      ).resolves.toEqual({
        path: relativePath('fixtures/normal/tsconfig.no-extension.json'),
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

    it('A different file name is specified in options in nested/1', () => {
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

    it('A different file name is specified in options in nested/1, and extends option is set to false', () => {
      expect(
        load(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).resolves.toEqual({
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
      expect(load(relativePath('fixtures/nested/1/2/'))).resolves.toEqual({
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
      expect(load(relativePath('fixtures/nested/1/2/'), { extends: false })).resolves.toEqual({
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

    it('A different file name is specified in options in nested/1/2, and extends option is set to false', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).resolves.toEqual({
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
      expect(load(relativePath('fixtures/nested/1/2/3'))).resolves.toEqual({
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
      expect(load(relativePath('fixtures/nested/1/2/3'), { extends: false })).resolves.toEqual({
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

    it('A different file name is specified in options in nested/1/2/3, and extends option is set to false', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).resolves.toEqual({
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
      expect(load(relativePath('fixtures/nested/1/2/3/4'))).resolves.toEqual({
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
      expect(load(relativePath('fixtures/nested/1/2/3/4'), { extends: false })).resolves.toEqual({
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
        load(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
        }),
      ).resolves.toEqual({
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
        load(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
          extends: false,
        }),
      ).resolves.toEqual({
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
      ).rejects.toThrow(/^The specified file does not exist: /);
    });

    it('A different file name is specified in options in nested/1, and extends option is set to false', () => {
      expect(
        load(relativePath('fixtures/nested/1'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
          extends: false,
        }),
      ).rejects.toThrow(/^The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      expect(load(relativePath('fixtures/nested/1/2/'), { recursive: false })).resolves.toEqual({
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
        load(relativePath('fixtures/nested/1/2/'), {
          recursive: false,
          extends: false,
        }),
      ).resolves.toEqual({
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
        load(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).rejects.toThrow(/^The specified file does not exist: /);
    });

    it('A different file name is specified in options in nested/1/2, and extends option is set to false', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
          extends: false,
        }),
      ).rejects.toThrow(/^The specified file does not exist: /);
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
      ).rejects.toThrow(/^The specified file does not exist: /);
    });

    it('A different file name is specified in options in nested/1/2/3, and extends option is set to false', () => {
      expect(
        load(relativePath('fixtures/nested/1/2/3'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
          extends: false,
        }),
      ).rejects.toThrow(/^The specified file does not exist: /);
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
        load(relativePath('fixtures/nested/1/2/3/4'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
          extends: false,
        }),
      ).resolves.toEqual({
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

  describe('extends from a npm packages', () => {
    it('specify normally', () => {
      expect(load(relativePath('fixtures/extends-from-npm-package'))).resolves.toEqual({
        path: relativePath('fixtures/extends-from-npm-package/tsconfig.json'),
        config: {
          $schema: 'https://json.schemastore.org/tsconfig',
          compilerOptions: {
            target: 'ES2020',
            module: 'ESNEXT',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
          display: 'Recommended',
        },
      });
    });

    it('specify without extension name', () => {
      expect(
        load(relativePath('fixtures/extends-from-npm-package'), {
          fileName: 'tsconfig.no-extension.json',
        }),
      ).resolves.toEqual({
        path: relativePath('fixtures/extends-from-npm-package/tsconfig.no-extension.json'),
        config: {
          $schema: 'https://json.schemastore.org/tsconfig',
          compilerOptions: {
            target: 'ES2020',
            module: 'ESNEXT',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
          },
          display: 'Recommended',
        },
      });
    });

    it('specify an absolute path as a path to npm package', () => {
      expect(
        load(relativePath('fixtures/extends-from-npm-package/tsconfig.build.json')),
      ).resolves.toEqual({
        path: relativePath('fixtures/extends-from-npm-package/tsconfig.build.json'),
        config: {
          $schema: 'https://json.schemastore.org/tsconfig',
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
          display: 'Recommended',
        },
      });
    });
  });

  describe('detect circular dependency', () => {
    it('extends config cyclically', () => {
      expect(() => load(relativePath('fixtures/circular/tsconfig.build.json'), {})).rejects.toThrow(
        'Circular dependency in extends property is detected.',
      );
    });
  });

  describe('invalid', () => {
    it('An invalid file name is specified in cwd', () => {
      expect(load(relativePath('fixtures/normal/invalid-tsconfig.json'))).rejects.toThrow(
        /Cannot find invalid-tsconfig\.json file at the specified directory: /,
      );
    });

    it('An file name without extension name is specified in cwd', () => {
      expect(() => load(relativePath('fixtures/normal/tsconfig.build'))).rejects.toThrow(
        /Cannot find tsconfig\.build file at the specified directory: /,
      );
    });

    it('An invalid file name is specified in options', () => {
      expect(
        load(relativePath('fixtures/normal'), {
          fileName: 'invalid-tsconfig.json',
        }),
      ).rejects.toThrow(/^Cannot find invalid-tsconfig\.json file at the specified directory: /);
    });

    it('An empty file name is specified in options', () => {
      expect(
        load(relativePath('fixtures/normal'), {
          fileName: '',
        }),
      ).rejects.toThrow(/^The specified file does not exist, but a directory exists: /);
    });

    it('An file name without extension name is specified in options', () => {
      expect(() =>
        load(relativePath('fixtures/normal'), {
          fileName: 'tsconfig.build',
        }),
      ).rejects.toThrow(/^Cannot find tsconfig\.build file at the specified directory: /);
    });

    it('An invalid way of specifying a directory in options', () => {
      expect(
        // @ts-expect-error
        load(relativePath('fixtures'), {
          fileName: 'normal',
        }),
      ).rejects.toThrow(/^The specified file does not exist, but a directory exists: /);
    });

    it('Duplicated specifying a file in options', () => {
      expect(() =>
        load(relativePath('fixtures/normal/tsconfig.json'), {
          fileName: 'tsconfig.build.json',
        }),
      ).rejects.toThrow(/^Cannot find tsconfig\.build\.json file at the specified directory: /);
    });

    it('An invalid relative path in extends prop is specified', () => {
      expect(() =>
        load(relativePath('fixtures/invalid-extends'), {
          fileName: 'tsconfig.build.json',
        }),
      ).rejects.toThrow(/^ENOENT: no such file or directory, open /);
    });

    it('An invalid path to a npm package in extends prop is specified', () => {
      expect(() => load(relativePath('fixtures/invalid-extends'))).rejects.toThrow(
        /Cannot find module /,
      );
    });
  });
});
