import { type ILoadPayments } from '@/core'
import { PaymentRepository } from '@/adapters/repositories'
import { LoadPayments } from '@/usecases'

export const makeLoadPayments = (): ILoadPayments => {
  const repository = new PaymentRepository()
  return new LoadPayments(repository)
}
