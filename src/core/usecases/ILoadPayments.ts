import { type Payment } from '@/domain'

export interface ILoadPayments {
  execute: (filter: any) => Promise<Payment[]>
}
