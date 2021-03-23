import { Profile } from '../../typings/enum-types';
import { ProfileOptions } from '../../typings/domain-types';
/**
 * ConfigOptions
 * @desc Type representing tag configuration options by profile
 */
export declare type ConfigOptions = Record<Profile, Partial<ProfileOptions>>;
/**
 * Tag configuration options
 */
export declare const CONFIG: Readonly<ConfigOptions>;
//# sourceMappingURL=configs.d.ts.map