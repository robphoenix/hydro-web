export interface IFeedTypes {
  [key: string]: {
    [key: string]: JavaType;
  };
}

export enum JavaType {
  JavaLangLong = 'java.lang.Long',
  JavaLangString = 'java.lang.String',
}
