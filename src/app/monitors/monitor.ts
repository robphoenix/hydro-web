export interface IMonitor {
  id: string;
  topic: string;
  queryBody: string;
  queryDescription: string;
  dateCreated: Date;
  categories: Category[];
}

export interface Category {
  id: string;
  value: string;
  dateCreated: Date;
}
