import { Profile } from '../../typings/enum-types'
import { ProfileOptions } from '../../typings/types'

export type ConfigOptions = Record<Profile, ProfileOptions>

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
}
