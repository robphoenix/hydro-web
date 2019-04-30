import { IGroup } from '../monitors/monitor';
import { Permissions } from './user';

/**
 * Describes the decoded JWT access token
 *
 * @export
 * @interface IAccessToken
 */
export interface IAccessToken {
  username: string;
  groups: IGroup[];
  displayName: string;
  permissions: Permissions[];
  role: string;
  iat: number;
  exp: number;
}
