export interface Product {
  _id?: string
  name: string
  cost: number
  quantity: number
  category?: string
  categoryName?: string
  images?: Blob[]
  description?: string
}
export interface Category {
  _id?: string
  image: string
  name: string
  categoryName?: string
  quantity: number
}
export interface Order {
  number?: number
  name: string
  list: OrderPosition[]
}
export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  _id?: string
}

export interface ToastMessage {
  message: string
}

export interface Message {
  _id?: string
  name: string
  email: string
  message: string
}
export interface Mail {
  email: string
  date?: Date
  _id?: string
}
export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
}
