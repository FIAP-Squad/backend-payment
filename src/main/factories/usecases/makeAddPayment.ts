import { type IAddPayment } from '@/core'
import { PaymentRepository } from '@/adapters/repositories'
import { AddPayment } from '@/usecases'

export const makeAddPayment = (): IAddPayment => {
  const repository = new PaymentRepository()
  return new AddPayment(repository)
}
