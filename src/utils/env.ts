import { ProfileOptions } from '../../typings/types'

import { hasProperty } from './validators'
import { CONFIG } from '../configs/configs'

const getProfile = (): ProfileOptions => {
    return process.env.NODE_ENV && hasProperty(CONFIG, process.env.NODE_ENV) && CONFIG[process.env.NODE_ENV]
}

export const profile = getProfile()
