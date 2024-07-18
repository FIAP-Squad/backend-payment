import { type Router } from 'express'
import { adaptRoute } from '@/main/frameworks'
import { makeUpdatePaymentController, makeAddPaymentController, makeLoadPaymentsController } from '@/main/factories/controllers'

export const payment = (router: Router): void => {
  router.patch('/payment/:id', adaptRoute(makeUpdatePaymentController()))
  router.post('/payment', adaptRoute(makeAddPaymentController()))
  router.get('/payment', adaptRoute(makeLoadPaymentsController()))
}
