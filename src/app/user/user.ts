/**
 * Describes the user.
 *
 * @export
 * @interface IUser
 */
export interface IUser {
  username: string;
  role: Role;
}

/**
 * Describes the possible roles for a user.
 *
 * @export
 * @enum {string}
 */
export enum Role {
  admin = 'ADMIN',
}
