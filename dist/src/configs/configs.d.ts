import { Profile } from '../../typings/enum-types';
import { ProfileOptions } from '../../typings/domain-types';
/**
 * ProfileRecord
 * @desc Type representing profile configuration options
 */
export declare type ProfileRecord = Record<Profile, Partial<ProfileOptions>>;
/**
 * Tag configuration options
 */
export declare const CONFIG: Readonly<ProfileRecord>;
//# sourceMappingURL=configs.d.ts.map