export interface Product {
  _id?: string;
  active: boolean;
  recommend: boolean;
  name: string;
  cost: number;
  costOld?: number;
  quantity: number;
  category?: Pick<Category, '_id' | 'name'>;
  images?: any;
  description?: string;
  brand?: Pick<Brand, '_id' | 'name'>;
}

export interface Category {
  _id?: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
}

export interface Order {
  _id?: string;
  index?: number;
  name: string;
  email: string;
  tel: string;
  list: Position[];
  comment?: string;
  date?: Date;
  status?: string;
  address?: string;
  payment?: Payment;
  delivery?: Delivery;
}

export enum Payment {
  card = 'card',
  cash = 'cash'
}

export enum Delivery {
  courier = 'courier',
  picksUp = 'picks-up'
}

export class Position {
  _id: string;
  name: string;
  cost: number;
  quantity: number;
  image: string;
}

export interface ToastMessage {
  message: string;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  message: string;
  date: number;
}

export interface Mail {
  email: string;
  date?: Date;
  _id?: string;
}

export interface MaterialInstance {
  open?(): void;

  close?(): void;

  destroy?(): void;
}

export class Meta {
  newOrders: number;
  products: number;
}

export class DndMeta {
  eventIndex: number;
  dataIndex: number;
}

export interface SearchItem {
  id: string;
  name: string;
  type: string;
}

export interface HomeProductList {
  recommended: Array<Position>;
  newItems: Array<Position>;
}

export interface Brand {
  _id?: string;
  name: string;
  description: string;
  active: boolean;
  logo: any;
}

export interface ProductAdditionalInfo {
  categories: Category[];
  brands: Brand[];
}


export interface Config {
  categories: Category[];
  newItems: Product[];
  recommended: Product[];
}
