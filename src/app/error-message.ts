/**
 * Describes the error messages returned by the API server.
 *
 * @export
 * @interface IErrorMessage
 */
export interface IErrorMessage {
  errorCode: string;
  message: string;
  cause: string;
}