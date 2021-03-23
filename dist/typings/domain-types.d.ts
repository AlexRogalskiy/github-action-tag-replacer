import { ReplaceInFileConfig } from 'replace-in-file';
/**
 * ConfigOptions
 * @desc Type representing configuration options
 */
export declare type ConfigOptions = {
    /**
     * Prefix to include
     */
    prefix?: string;
    /**
     * Suffit to include
     */
    suffix?: string;
    /**
     * Source file to process
     */
    sourceFile?: string;
    /**
     * Placeholder or regex to replace by
     */
    placeholder?: string;
    /**
     * Replacement string data
     */
    replacement?: string;
};
/**
 * ProfileOptions
 * @desc Type representing profile options
 */
export declare type ProfileOptions = Omit<ReplaceInFileConfig, 'files' | 'from' | 'to'>;
//# sourceMappingURL=domain-types.d.ts.map