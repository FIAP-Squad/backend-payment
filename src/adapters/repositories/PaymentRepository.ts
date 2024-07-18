import { prismaClient } from '@/adapters/repositories/prismaClient'
import {
  type IUpdatePaymentRepository,
  type UpdatePaymentParamsRepository
} from '@/core'

export class PaymentRepository implements IUpdatePaymentRepository {
  async update (params: UpdatePaymentParamsRepository): Promise<void> {
    const { id, body } = params
    await prismaClient.payment.update({ where: { id }, data: { ...body } })
  }
}
