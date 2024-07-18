import { type Router } from 'express'
import { adaptRoute } from '@/main/frameworks'
import { makeUpdatePaymentController, makeAddPaymentController } from '@/main/factories/controllers'

export const payment = (router: Router): void => {
  router.patch('/payment/:id', adaptRoute(makeUpdatePaymentController()))
  router.post('/payment', adaptRoute(makeAddPaymentController()))
}
