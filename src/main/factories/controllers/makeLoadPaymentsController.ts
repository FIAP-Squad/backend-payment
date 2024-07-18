import { makeLoadPayments } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { LoadPaymentsController } from '@/adapters/controllers'
import { type IController } from '@/core'

export const makeLoadPaymentsController = (): IController => {
  const controller = new LoadPaymentsController(makeLoadPayments())
  return makeLogControllerDecorator(controller)
}
