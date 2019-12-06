export interface Product {
  _id?: string
  name: string
  cost: number
  quantity: number
  category?: string
  description?: string
}
export interface Category {
  _id?: string
  image: string
  name: string
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

export interface Message {
  message: string
}
