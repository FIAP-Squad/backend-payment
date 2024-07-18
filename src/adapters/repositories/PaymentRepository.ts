import { prismaClient } from '@/adapters/repositories/prismaClient'
import {
  type IAddPaymentRepository,
  type IUpdatePaymentRepository,
  type UpdatePaymentParamsRepository
} from '@/core'
import { type Payment } from '@/domain'

export class PaymentRepository implements IAddPaymentRepository, IUpdatePaymentRepository {
  async update (params: UpdatePaymentParamsRepository): Promise<void> {
    const { id, body } = params
    await prismaClient.payment.update({ where: { id }, data: { ...body } })
  }

  async add (params: Payment): Promise<void> {
    await prismaClient.payment.create({ data: params })
  }
}
