import { LDAPGroup } from '../monitors/monitor';

/**
 * Describes the user.
 *
 * @export
 * @interface IUser
 */
export interface IUser {
  username: string;
  displayName: string;
  groups: LDAPGroup[];
}
