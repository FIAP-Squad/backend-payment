import { type IValidation } from '@/core'
import { makeAddPaymentValidation } from '@/main/factories/validations'
import {
  MandatoryFieldValidation,
  ValidationComposite
} from '@/adapters/validation'

jest.mock('@/adapters/validation/ValidationComposite')

describe('Add Payment IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeAddPaymentValidation()
    const validations: IValidation[] = []
    const fields = ['status', 'amount', 'orderId']
    validations.push(new MandatoryFieldValidation(fields))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
