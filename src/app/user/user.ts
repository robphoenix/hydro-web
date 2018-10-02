export interface IUser {
  username: string;
  role: Role;
}

export enum Role {
  admin = 'ADMIN',
}
