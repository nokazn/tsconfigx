export interface Options {
  /**
   * @default 'tsconfig.json'
   */
  fileName?: string;

  /**
   * enable to search recursively parent directories.
   * @default true
   */
  recursive?: boolean;
}

export interface ReadFileOptions {
  /** @default 'utf-8' */
  encoding?: BufferEncoding;
}

export interface LoadOptions extends Options {
  /**
   * enable to track extended tsconfig.json file.
   * @default true
   */
  extends?: boolean;
}

/**
 * Configuration options
 * See also https://www.typescriptlang.org/tsconfig
 * ____________________________________________________________________________________________________
 */

type EcmaVersions = 3 | 5 | 6 | 7 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 'Next';

type ES2015Components =
  | 'Core'
  | 'Collection'
  | 'Generator'
  | 'Iterable'
  | 'Promise'
  | 'Proxy'
  | 'Reflect'
  | 'Symbol'
  | 'Symbol.WellKnown';
type ES2016Components = 'array.include';
type ES2017Components = 'object' | 'Intl' | 'SharedMemory' | 'String' | 'TypedArrays';
type ES2018Components = 'Intl' | 'Promise' | 'RegExp';
type ES2019Components = 'Array' | 'Object' | 'String' | 'Symbol';
type ES2020Components = 'String' | 'Symbol.wellknown';
type ESNextComponents = 'AsyncIterable' | 'Array' | 'Intl' | 'Symbol';
type DOMComponents = 'Iterable';
type LibOptions =
  | `ES${EcmaVersions}`
  | `ES${6 | 2015}.${ES2015Components}`
  | `ES${7 | 2016}.${ES2016Components}`
  | `ES2017.${ES2017Components}`
  | `ES2018.${ES2018Components}`
  | `ES2019.${ES2019Components}`
  | `ES2020.${ES2020Components}`
  | `ESNEXT.${ESNextComponents}`
  | 'DOM'
  | `DOM.${DOMComponents}`
  | 'WebWorker'
  | 'ScriptHost';

type ModuleOptions =
  | 'CommonJS'
  | 'UMD'
  | 'AMD'
  | 'System'
  | `ES${3 | 5 | 6 | 2015 | 2020 | 'Next'}`
  | 'none';

type TargetOptions = `ES${EcmaVersions}`;
type JSXOptions = 'react' | `react-${'jsx' | 'jsxdev' | 'native'}` | 'preserve';
type ModuleResolutionStrategyOptions = 'node' | 'classic';
type FallbackOptions =
  | 'fixedPollingInterval'
  | 'priorityPollingInterval'
  | 'dynamicPriorityPolling';
type WatchDirectoryOptions = 'fixedPollingInterval' | 'dynamicPriorityPolling' | 'useFsEvents';
type WatchFileOptions =
  | WatchDirectoryOptions
  | 'priorityPollingInterval'
  | 'useFsEventsOnParentDirectory';
type ImportsNotUsedAsValuesOptions = 'remove' | 'preserve' | 'error';
type NewLineOptions = 'lf' | 'crlf';

interface ProjectOptions {
  /** @default false */
  allowJs?: boolean;
  /** @default false */
  checkJs?: boolean;
  /** @default true */
  composite?: boolean;
  /** @default false */
  declaration?: boolean;
  /** @default false */
  declarationMap?: boolean;
  /** @default false */
  downlevelIteration?: boolean;
  /** @default false */
  importHelpers?: boolean;
  /** true if `composite` is set, false otherwise by default */
  incremental?: boolean;
  /** @default false */
  isolatedModules?: boolean;
  jsx?: JSXOptions;
  lib?: LibOptions[];
  module?: ModuleOptions;
  /** @default false */
  noEmit?: boolean;
  outDir?: string;
  outFile?: string;
  plugins?: string[];
  /** @default false */
  removeComments?: boolean;
  rootDir?: string;
  /** @default false */
  sourceMap?: boolean;
  /** @default 'ES3' */
  target?: TargetOptions;
  /** @default '.tsbuildinfo' */
  tsBuildInfoFile?: string;
}
interface StrictChecksOptions {
  /** false by default unless `strict` is set */
  alwaysStrict?: boolean;
  /** false by default unless `strict` is set */
  noImplicitAny?: boolean;
  /** false by default unless `strict` is set */
  noImplicitThis?: boolean;
  strict?: boolean;
  /** false by default unless `strict` is set */
  strictBindCallApply?: boolean;
  /** false by default unless `strict` is set */
  strictFunctionTypes?: boolean;
  /** false by default unless `strict` is set */
  strictNullChecks?: boolean;
  /** false by default unless `strict` is set */
  strictPropertyInitialization?: boolean;
}

interface ModuleResolutionOptions {
  /** true by default if `module` === 'system' or `esModuleInterop` */
  allowSyntheticDefaultImports?: boolean;
  /** @default false */
  allowUmdGlobalAccess?: boolean;
  baseUrl?: string;
  /** @default false */
  esModuleInterop?: boolean;
  /** 'classic' by default if `module` === 'AMD' or 'UMD' or 'System' or 'ES6' */
  moduleResolution?: ModuleResolutionStrategyOptions;
  paths?: Record<string, string[]>;
  /** @default false */
  preserveSymlinks?: boolean;
  rootDirs?: string[];
  typeRoots?: string[];
  types?: string[];
}
interface SourceMapsOptions {
  /** @default false */
  inlineSourceMap?: boolean;
  /** @default false */
  inlineSources?: boolean;
  mapRoot?: string;
  sourceRoot?: string;
}
interface LinterChecksOptions {
  /** @default false */
  noFallthroughCasesInSwitch?: boolean;
  noImplicitOverride?: boolean;
  /** @default false */
  noImplicitReturns?: boolean;
  /** @default false */
  noPropertyAccessFromIndexSignature?: boolean;
  /** @default false */
  noUncheckedIndexedAccess?: boolean;
  /** @default false */
  noUnusedLocals?: boolean;
  /** @default false */
  noUnusedParameters?: boolean;
}
interface ExperimentalOptions {
  /** @default false */
  emitDecoratorMetadata?: boolean;
  /** @default false */
  experimentalDecorators?: boolean;
}
interface CommandLineOptions {
  /** @default false */
  preserveWatchOutput?: boolean;
  /** @default true */
  pretty?: boolean;
}
interface WatchOptions {
  fallbackPolling: FallbackOptions;
  /** @default 'useFsEvents' */
  watchDirectory: WatchDirectoryOptions;
  /** @default 'useFsEvents' */
  watchFile: WatchFileOptions;
}
interface AdvancedOptions {
  allowUnreachableCode?: boolean;
  allowUnusedLabels?: boolean;
  assumeChangesOnlyAffectDirectDependencies?: boolean;
  /** @deprecated */
  charset?: boolean;
  declarationDir?: string;
  /**
   * @deprecated
   * @default false
   */
  diagnostics?: boolean;
  disableReferencedProjectLoad?: boolean;
  /** @default false */
  disableSizeLimit?: boolean;
  disableSolutionSearching?: boolean;
  disableSourceOfProjectReferenceRedirect?: boolean;
  /** @default false */
  emitBOM?: boolean;
  /** @default false */
  emitDeclarationOnly?: boolean;
  explainFiles?: boolean;
  /** @default false */
  extendedDiagnostics?: boolean;
  /** @default false */
  forceConsistentCasingInFileNames?: boolean;
  /** @default 'profile.cpuprofile' */
  generateCpuProfile?: boolean;
  importsNotUsedAsValues?: ImportsNotUsedAsValuesOptions;
  /** @default 'React.createElement' */
  jsxFactory?: string;
  jsxFragmentFactory?: string;
  /** @default 'react' */
  jsxImportSource?: string;
  /**
   * @deprecated
   * @default false
   */
  keyofStringsOnly?: boolean;
  /** @default false */
  listEmittedFiles?: boolean;
  /** @default false */
  listFiles?: boolean;
  /** @default 0 */
  maxNodeModuleJsDepth?: number;
  newLine?: NewLineOptions;
  /** @default false */
  noEmitHelpers?: boolean;
  /** @default false */
  noEmitOnError?: boolean;
  /**
   * @deprecated
   * @default false
   */
  noErrorTruncation?: boolean;
  /** @default false */
  noImplicitUseStrict?: boolean;
  /** @default false */
  noLib?: boolean;
  /** @default false */
  noResolve?: boolean;
  /** @default false */
  noStrictGenericChecks?: boolean;
  /** @deprecated */
  out?: string;
  /** @default false */
  preserveConstEnums?: boolean;
  /** @default 'React' */
  reactNamespace?: string;
  /** @default false */
  resolveJsonModule?: boolean;
  /** @default false */
  skipDefaultLibCheck?: boolean;
  /** @default false */
  skipLibCheck?: boolean;
  stripInternal?: boolean;
  /** @default false */
  suppressExcessPropertyErrors?: boolean;
  /** @default false */
  suppressImplicitAnyIndexErrors?: boolean;
  /** @default false */
  traceResolution?: boolean;
  /** @default false */
  useDefineForClassFields?: boolean;
}

interface CompilerOptions
  extends ProjectOptions,
    StrictChecksOptions,
    ModuleResolutionOptions,
    SourceMapsOptions,
    LinterChecksOptions,
    ExperimentalOptions,
    CommandLineOptions,
    WatchOptions,
    AdvancedOptions {}

interface Reference {
  path: string;
  prepend?: boolean;
}

interface TypeAcquisition {
  enable?: boolean;
  disableFilenameBasedTypeAcquisition?: boolean;
  exclude?: string[];
  include?: string[];
}

export interface ConfigOptions {
  extends?: string;
  compileOnSave?: boolean;
  compilerOptions?: CompilerOptions;
  exclude?: string[];
  include?: string[];
  files?: string[];
  references?: Reference[];
  typeAcquisition?: TypeAcquisition;
  // TODO
  'ts-node'?: unknown;
}
