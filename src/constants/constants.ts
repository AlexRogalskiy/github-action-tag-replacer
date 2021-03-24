import boxen from 'boxen'

import { ReplaceOptions } from '../../typings/domain-types'

/**
 * Replace configuration options
 */
export const REPLACE_OPTIONS: Readonly<ReplaceOptions> = {
    allowEmptyPaths: true,
    disableGlobs: false,
    encoding: 'utf-8',
}

/**
 * Output configuration options
 */
export const OUTPUT_OPTIONS: Readonly<boxen.Options> = {
    padding: 1,
    margin: 1,
    borderStyle: 'single',
    borderColor: 'yellow',
}
