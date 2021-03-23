import { Profile } from '../../typings/enum-types'
import { ProfileOptions } from '../../typings/domain-types'

/**
 * ProfileRecord
 * @desc Type representing profile configuration options
 */
export type ProfileRecord = Record<Profile, Partial<ProfileOptions>>

/**
 * Tag configuration options
 */
export const CONFIG: Readonly<ProfileRecord> = {
    dev: {
        allowEmptyPaths: true,
        disableGlobs: false,
        encoding: 'utf-8',
    },
    prod: {
        allowEmptyPaths: false,
        disableGlobs: true,
        encoding: 'utf-8',
    },
    test: {
        allowEmptyPaths: false,
        disableGlobs: false,
        encoding: 'utf-8',
    },
}
