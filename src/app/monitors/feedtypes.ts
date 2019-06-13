export interface IFeedTypes {
  [key: string]: IFeedType[];
}

export interface IFeedType {
  name: string;
  help: string;
  javaType: JavaType;
  order: number;
  type?: string;
  format?: string;
}

export enum JavaType {
  JavaLangLong = 'java.lang.Long',
  JavaLangString = 'java.lang.String',
}
