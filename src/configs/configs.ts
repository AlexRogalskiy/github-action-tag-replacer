import { Profile } from '../../typings/enum-types'
import { ProfileOptions } from '../../typings/domain-types'

/**
 * ConfigOptions
 * @desc Type representing tag configuration options by profile
 */
export type ConfigOptions = Record<Profile, Partial<ProfileOptions>>

/**
 * Tag configuration options
 */
export const CONFIG: Readonly<ConfigOptions> = {
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
