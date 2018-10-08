/**
 * Describes the decoded JWT access token
 *
 * @export
 * @interface IAccessToken
 */
export interface IAccessToken {
  username: string;
  role: string;
  iat: number;
  exp: number;
}
