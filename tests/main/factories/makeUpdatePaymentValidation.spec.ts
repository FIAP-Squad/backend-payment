import { type IValidation } from '@/core'
import { makeUpdatePaymentValidation } from '@/main/factories/validations'
import {
  MandatoryFieldValidation,
  ValidationComposite
} from '@/adapters/validation'

jest.mock('@/adapters/validation/ValidationComposite')

describe('Update Payment IValidation Factory', () => {
  test('Should call validation with all validations ', () => {
    makeUpdatePaymentValidation()
    const validations: IValidation[] = []
    const fields = ['status', 'amount', 'orderId']
    validations.push(new MandatoryFieldValidation(fields))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
