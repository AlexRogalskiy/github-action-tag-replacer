import { Profile } from '../../typings/enum-types'
import { ProfileOptions } from '../../typings/domain-types'

import { OUTPUT_OPTIONS, REPLACE_OPTIONS } from '../constants/constants'

import { mergeProps } from '../utils/commons'

/**
 * ProfileRecord
 * @desc Type representing profile configuration options
 */
export type ProfileRecord = Record<Profile, Partial<ProfileOptions>>

/**
 * Configuration options
 */
export const CONFIG: Readonly<ProfileRecord> = {
    dev: {
        replaceOptions: REPLACE_OPTIONS,
        outputOptions: OUTPUT_OPTIONS,
    },
    prod: {
        replaceOptions: mergeProps(REPLACE_OPTIONS, { allowEmptyPaths: false, disableGlobs: true }),
        outputOptions: OUTPUT_OPTIONS,
    },
    test: {
        replaceOptions: mergeProps(REPLACE_OPTIONS, { allowEmptyPaths: false }),
        outputOptions: OUTPUT_OPTIONS,
    },
}
