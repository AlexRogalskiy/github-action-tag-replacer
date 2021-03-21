import { ReplaceInFileConfig } from 'replace-in-file';
/**
 * ConfigOptions
 * @desc Type representing configuration options
 */
export declare type ConfigOptions = {
    prefix?: string;
    suffix?: string;
    sourceFile?: string;
    placeholder?: string;
    replacement?: string;
};
/**
 * ProfileOptions
 * @desc Type representing profile options
 */
export declare type ProfileOptions = Omit<ReplaceInFileConfig, 'files' | 'from' | 'to'>;
//# sourceMappingURL=types.d.ts.map