import { type Payment } from '@/domain'
import { type ILoadPayments, type ILoadPaymentsRepository } from '@/core'

export class LoadPayments implements ILoadPayments {
  constructor (private readonly _repository: ILoadPaymentsRepository) { }
  async execute (filter: any): Promise<Payment[]> {
    return await this._repository.loadAll(filter)
  }
}
