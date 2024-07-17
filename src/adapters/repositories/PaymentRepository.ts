import { prismaClient } from '@/adapters/repositories/prismaClient'
import { type Payment } from '@/domain/entities'
import {
  type IUpdatePaymentRepository,
  type IAddPaymentRepository,
  type UpdatePaymentParams
} from '@/core/ports/driven'

export class PaymentRepository implements IAddPaymentRepository, IUpdatePaymentRepository {
  async addPayment (params: Payment): Promise<void> {
    await prismaClient.payment.create({ data: params })
  }

  async update (params: UpdatePaymentParams): Promise<void> {
    const { id, body } = params
    await prismaClient.payment.update({ where: { id }, data: { ...body } })
  }
}
