import { prismaClient } from '@/adapters/repositories/prismaClient'
import {
  type ILoadPaymentsRepository,
  type IAddPaymentRepository,
  type IUpdatePaymentRepository,
  type UpdatePaymentParamsRepository
} from '@/core'
import { type Payment } from '@/domain'

export class PaymentRepository implements ILoadPaymentsRepository, IAddPaymentRepository, IUpdatePaymentRepository {
  async update (params: UpdatePaymentParamsRepository): Promise<void> {
    const { id, body } = params
    await prismaClient.payment.update({ where: { orderId: id }, data: { ...body } })
  }

  async add (params: Payment): Promise<void> {
    console.log(params)
    await prismaClient.payment.create({ data: params })
  }

  async loadAll (filter: any): Promise<Payment[]> {
    return await prismaClient.payment.findMany({
      where: filter,
      select: {
        amount: true,
        status: true,
        orderId: true
      }
    })
  }
}
