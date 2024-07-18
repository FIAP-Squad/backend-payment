import {
  type IHTTPRequest,
  type IValidation,
  type IAddPayment
} from '@/core'
import { AddPaymentController } from '@/adapters/controllers'
import {
  badRequest,
  serverError,
  created
} from '@/adapters/helpers'
import { type Payment } from '@/domain'

const mockPayment = (): Payment => ({
  amount: 1000,
  status: 'any_status',
  orderId: 'any_orderId'
})

const mockRequest = (): IHTTPRequest => ({
  body: mockPayment()
})

const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  const validationStub = new ValidationStub()
  return validationStub
}

const mockAddPaymentStub = (): IAddPayment => {
  class AddPaymentStub implements IAddPayment {
    async execute (data: Payment): Promise<void> {
      return await Promise.resolve()
    }
  }
  const addPaymentStub = new AddPaymentStub()
  return addPaymentStub
}

interface SutTypes {
  sut: AddPaymentController
  validationStub: IValidation
  addPaymentStub: IAddPayment
}

const mockSut = (): SutTypes => {
  const addPaymentStub = mockAddPaymentStub()
  const validationStub = mockValidation()
  const sut = new AddPaymentController(validationStub, addPaymentStub)
  return {
    sut,
    validationStub,
    addPaymentStub
  }
}

describe('Add Payment IController', () => {
  test('Should call IValidation with correct values ', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should call IAddPayment usign correct values', async () => {
    const { sut, addPaymentStub } = mockSut()
    const addPaymentSpy = jest.spyOn(addPaymentStub, 'execute')
    const request = mockRequest()
    await sut.handle(request)
    expect(addPaymentSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should return 500 if IAddPayment throws', async () => {
    const { sut, addPaymentStub } = mockSut()
    jest.spyOn(addPaymentStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should return 201 on success', async () => {
    const { sut, addPaymentStub } = mockSut()
    jest.spyOn(addPaymentStub, 'execute')
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(created())
  })
})
