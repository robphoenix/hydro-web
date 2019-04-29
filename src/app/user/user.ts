import { IGroup } from '../monitors/monitor';

/**
 * Describes the user.
 *
 * @export
 * @interface IUser
 */
export interface IUser {
  username: string;
  displayName: string;
  groups: IGroup[];
  permissions: Permissions[];
}

export enum Permissions {
  AllowsGroupEdit = 'allowsGroupEdit',
  AllowsBlock = 'allowsBlock',
  AllowsUnblock = 'allowsUnblock',
  IsAdmin = 'isAdmin',
  AllowsEdit = 'allowsEdit',
  AppUser = 'appUser',
  ViewAll = 'viewAll',
}
