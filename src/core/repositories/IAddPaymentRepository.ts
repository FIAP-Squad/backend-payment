import { type Payment } from '@/domain'

export interface IAddPaymentRepository {
  add: (params: Payment) => Promise<void>
}
