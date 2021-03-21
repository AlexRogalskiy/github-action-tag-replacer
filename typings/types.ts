import { ReplaceInFileConfig } from 'replace-in-file'

/**
 * ConfigOptions
 * @desc Type representing configuration options
 */
export type ConfigOptions = {
    prefix?: string
    suffix?: string
    sourceFile?: string
    placeholder?: string
    replacement?: string
}

/**
 * ProfileOptions
 * @desc Type representing profile options
 */
export type ProfileOptions = Omit<ReplaceInFileConfig, 'files' | 'from' | 'to'>
