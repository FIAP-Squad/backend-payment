import {
  ok,
  noContent,
  serverError
} from '@/adapters/helpers'
import {
  type IHTTPRequest,
  type IController,
  type IHTTPResponse,
  type ILoadPayments
} from '@/core'

export class LoadPaymentsController implements IController {
  constructor (private readonly _service: ILoadPayments) { }
  async handle ({ query }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const filter = query ? { ...query } : {}
      const payments = await this._service.execute(filter)
      return (payments.length > 0) ? ok(payments) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
