export type Item = {
  totalItems: number
  unitPrice: number
  amount: number
}

export type ItemWithProductId = Item & { productId: string }

export type Order = {
  number: number
  customer: string
  status: string
  amount: number
  items: Item[]
}

export type OrderWithIds = Omit<Order, 'items'> & { items: ItemWithProductId[] }
