import { type Router } from 'express'
import { adaptRoute } from '@/main/frameworks'
import { makeUpdatePaymentController } from '@/main/factories/controllers'

export const payment = (router: Router): void => {
  router.patch('/payment/:id', adaptRoute(makeUpdatePaymentController()))
}
