export interface Monitor {
  id: number;
  topic: string;
  queryBody: string;
  queryDescription: string;
  live: boolean;
  dateCreated: number;
  editable: boolean;
  weighting: number;
  template: boolean;
  parentId: number;
  cacheWindow: number;
  aggregateParameter: string;
  categories: Category[];
  externalCalloutObjects: any[];
  groups: Group[];
  blocks: boolean;
  store: boolean;
  sortedCategoryList: Category[];
}

export interface Category {
  id: number;
  value: string;
  dateCreated: number;
}

export interface Group {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  viewAll: boolean;
  searchHint: string;
  parent: null;
}
