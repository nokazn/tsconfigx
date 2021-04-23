import { loadSync } from '~/load';
import { relativePath } from './utils';

describe('loadSync', () => {
  describe('normal', () => {
    it('cwd is specified as a file', () => {
      const { path, config } = loadSync(relativePath('fixtures/normal/tsconfig.json'));
      expect(path).toBe(relativePath('fixtures/normal/tsconfig.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
      });
    });

    it.skip('cwd is specified as a file with a different name', () => {
      const { path, config } = loadSync(relativePath('fixtures/normal/tsconfig.build.json'));
      expect(path).toBe(relativePath('fixtures/normal/tsconfig.build.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          declaration: true,
        },
      });
    });

    it('A file name is specified in options', () => {
      const { path, config } = loadSync(relativePath('fixtures/normal'), {
        fileName: 'tsconfig.json',
      });
      expect(path).toBe(relativePath('fixtures/normal/tsconfig.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
      });
    });

    it.skip('A different file name is specified in options', () => {
      const { path, config } = loadSync(relativePath('fixtures/normal'), {
        fileName: 'tsconfig.build.json',
      });
      expect(path).toBe(relativePath('fixtures/normal/tsconfig.build.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          declaration: true,
        },
      });
    });

    it('cwd is specified as a directory', () => {
      const { path, config } = loadSync(relativePath('fixtures/normal'));
      expect(path).toBe(relativePath('fixtures/normal/tsconfig.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
      });
    });
  });

  describe('set recursive option to true in a nested directory', () => {
    it('cwd is specified as a directory in nested/1', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1'));
      expect(path).toBe(relativePath('fixtures/nested/tsconfig.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
      });
    });

    it.skip('A different file name is specified in options in nested/1', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1'), {
        fileName: 'tsconfig.build.json',
      });
      expect(path).toBe(relativePath('fixtures/nested/tsconfig.build.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          declaration: true,
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1/2/'));
      expect(path).toBe(relativePath('fixtures/nested/1/2/tsconfig.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
      });
    });

    it.skip('A different file name is specified in options in nested/1/2', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1/2/'), {
        fileName: 'tsconfig.build.json',
      });
      expect(path).toBe(relativePath('fixtures/nested/tsconfig.build.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          declaration: true,
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2/3', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1/2/3'));
      expect(path).toBe(relativePath('fixtures/nested/1/2/tsconfig.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
      });
    });

    it.skip('A different file name is specified in options in nested/1/2/3', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1/2/3'), {
        fileName: 'tsconfig.build.json',
      });
      expect(path).toBe(relativePath('fixtures/nested/tsconfig.build.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          declaration: true,
        },
      });
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1/2/3/4'));
      expect(path).toBe(relativePath('fixtures/nested/1/2/tsconfig.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
      });
    });

    it.skip('A different file name is specified in options in nested/1/2/3/4', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1/2/3/4'), {
        fileName: 'tsconfig.build.json',
      });
      expect(path).toBe(relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          declaration: true,
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
      ).toThrow(/The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1/2/'), { recursive: false });
      expect(path).toBe(relativePath('fixtures/nested/1/2/tsconfig.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
      });
    });

    it('A different file name is specified in options in nested/1/2', () => {
      expect(() =>
        loadSync(relativePath('fixtures/nested/1/2/'), {
          fileName: 'tsconfig.build.json',
          recursive: false,
        }),
      ).toThrow(/The specified file does not exist: /);
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
      ).toThrow(/The specified file does not exist: /);
    });

    it('cwd is specified as a directory in nested/1/2/3/4', () => {
      expect(() => loadSync(relativePath('fixtures/nested/1/2/3/4'), { recursive: false })).toThrow(
        /The specified file does not exist: /,
      );
    });

    it.skip('A different file name is specified in options in nested/1/2/3/4', () => {
      const { path, config } = loadSync(relativePath('fixtures/nested/1/2/3/4'), {
        fileName: 'tsconfig.build.json',
        recursive: false,
      });
      expect(path).toBe(relativePath('fixtures/nested/1/2/3/4/tsconfig.build.json'));
      expect(config).toEqual({
        compilerOptions: {
          target: 'es5',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          declaration: true,
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
      ).toThrow(/Cannot find invalid-tsconfig\.json file at the specified directory: /);
    });

    it('An empty file name is specified in options', () => {
      expect(() =>
        loadSync(relativePath('fixtures/normal'), {
          fileName: '',
        }),
      ).toThrow(/The specified file does not exist, but a directory exists: /);
    });

    it('An invalid way of specifying directory in options', () => {
      expect(() =>
        // @ts-expect-error
        loadSync(relativePath('fixtures'), {
          fileName: 'normal',
        }),
      ).toThrow(/The specified file does not exist, but a directory exists: /);
    });
  });
});