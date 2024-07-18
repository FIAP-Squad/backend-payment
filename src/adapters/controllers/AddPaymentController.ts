import {
  badRequest,
  created,
  serverError
} from '@/adapters/helpers'
import {
  type IController,
  type IValidation,
  type IHTTPRequest,
  type IHTTPResponse,
  type IAddPayment
} from '@/core'

export class AddPaymentController implements IController {
  constructor (
    private readonly _validation: IValidation,
    private readonly _usecase: IAddPayment
  ) { }

  async handle ({ body }: IHTTPRequest): Promise<IHTTPResponse> {
    try {
      const error = this._validation.validate(body)
      if (error) return badRequest(error)
      const { amount, status, orderId } = body
      await this._usecase.execute({ amount, status, orderId })
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
