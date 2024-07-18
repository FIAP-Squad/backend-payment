import { type Payment } from '@/domain'
import { type ILoadPayments, type IHTTPRequest } from '@/core'
import { LoadPaymentsController } from '@/adapters/controllers'
import {
  ok,
  noContent,
  serverError
} from '@/adapters/helpers'

const mockPayment = (): Payment[] => ([
  {
    amount: 1000,
    status: 'any_status',
    orderId: 'any_orderId'
  },
  {
    amount: 2000,
    status: 'other_status',
    orderId: 'other_orderId'
  }
])

const mockLoadPayments = (): ILoadPayments => {
  class LoadPaymentsStub implements ILoadPayments {
    async execute (): Promise<Payment[]> {
      return await Promise.resolve(mockPayment())
    }
  }
  return new LoadPaymentsStub()
}

const mockRequest = (): IHTTPRequest => ({
  query: {
    orderId: 'any_orderId'
  }
})

interface SutType {
  sut: LoadPaymentsController
  loadPaymentStub: ILoadPayments
}

const mockSut = (): SutType => {
  const loadPaymentStub = mockLoadPayments()
  const sut = new LoadPaymentsController(loadPaymentStub)
  return {
    sut,
    loadPaymentStub
  }
}

describe('ILoadPayments IController', () => {
  test('Should call ILoadPayments', async () => {
    const { sut, loadPaymentStub } = mockSut()
    const loadSpy = jest.spyOn(loadPaymentStub, 'execute')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledWith({})
  })

  test('Should return 200 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle({})
    expect(response).toEqual(ok(mockPayment()))
  })

  test('Should return a payment on success', async () => {
    const { sut, loadPaymentStub } = mockSut()
    jest.spyOn(loadPaymentStub, 'execute').mockReturnValueOnce(Promise.resolve([mockPayment()[1]]))
    const response = await sut.handle(mockRequest())
    expect(response.body.length).toEqual(1)
  })

  test('Should return 204 LoadPayment returns empty', async () => {
    const { sut, loadPaymentStub } = mockSut()
    jest.spyOn(loadPaymentStub, 'execute').mockReturnValueOnce(Promise.resolve([]))
    const response = await sut.handle({})
    expect(response).toEqual(noContent())
  })

  test('Should 500 if ILoadPayments throws', async () => {
    const { sut, loadPaymentStub } = mockSut()
    jest.spyOn(loadPaymentStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error()))
  })
})
