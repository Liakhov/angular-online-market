export interface Product {
  _id?: string;
  name: string;
  cost: number;
  quantity: number;
  category?: string;
  categoryName?: string;
  images?: any;
  description?: string;
}
export interface Category {
  _id?: string;
  name: string;
  categoryName?: string;
  image: string;
  description: string;
  quantity: number;
}
export interface Order {
  _id?: string;
  number?: number;
  name: string;
  email: string;
  tel: string;
  list: Position[];
  comment?: string;
  date?: Date;
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
