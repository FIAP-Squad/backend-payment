import { makeAddPayment } from '@/main/factories/usecases'
import { makeAddPaymentValidation } from '@/main/factories/validations'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { AddPaymentController } from '@/adapters/controllers'
import { type IController } from '@/core'

export const makeAddPaymentController = (): IController => {
  const controller = new AddPaymentController(makeAddPaymentValidation(), makeAddPayment())
  return makeLogControllerDecorator(controller)
}
