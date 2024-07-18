import { type IValidation } from '@/core'
import {
  MandatoryFieldValidation,
  ValidationComposite
} from '@/adapters/validation'

export const makeAddPaymentValidation = (): IValidation => {
  const validations: IValidation[] = []
  const fields = ['status', 'amount', 'orderId']
  validations.push(new MandatoryFieldValidation(fields))
  return new ValidationComposite(validations)
}
