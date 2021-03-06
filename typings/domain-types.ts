import boxen from 'boxen'

import { ReplaceInFileConfig } from 'replace-in-file'

/**
 * ConfigOptions
 * @desc Type representing configuration options
 */
export type ConfigOptions = {
    /**
     * Prefix to include
     */
    readonly prefix?: string
    /**
     * Suffix to include
     */
    readonly suffix?: string
    /**
     * Source file to process
     */
    readonly sourceFile: string
    /**
     * Placeholder or regex to replace by
     */
    readonly placeholder: string
    /**
     * Replacement string data
     */
    readonly replacement: string
}
//--------------------------------------------------------------------------------------------------
/**
 * ProfileOptions
 * @desc Type representing profile options
 */
export type ProfileOptions = {
    /**
     * Image resize options
     */
    readonly replaceOptions?: ReplaceOptions
    /**
     * Output options
     */
    readonly outputOptions?: boxen.Options
}
//--------------------------------------------------------------------------------------------------
/**
 * ReplaceOptions
 * @desc Type representing replace options
 */
export type ReplaceOptions = Omit<ReplaceInFileConfig, 'files' | 'from' | 'to'>
//--------------------------------------------------------------------------------------------------
