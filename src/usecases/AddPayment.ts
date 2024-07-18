import { type Payment } from '@/domain'
import { type IAddPayment, type IAddPaymentRepository } from '@/core'

export class AddPayment implements IAddPayment {
  constructor (private readonly _repository: IAddPaymentRepository) { }
  async execute (params: Payment): Promise<void> {
    await this._repository.add(params)
  }
}
