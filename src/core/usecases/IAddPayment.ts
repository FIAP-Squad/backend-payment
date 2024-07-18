import { type Payment } from '@/domain'

export interface IAddPayment {
  execute: (params: Payment) => Promise<void>
}
