import { LDAPGroup } from '../monitors/monitor';

/**
 * Describes the decoded JWT access token
 *
 * @export
 * @interface IAccessToken
 */
export interface IAccessToken {
  username: string;
  groups: LDAPGroup[];
  displayName: string;
  role: string;
  iat: number;
  exp: number;
}
