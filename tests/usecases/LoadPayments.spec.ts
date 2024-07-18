import { LoadPayments } from '@/usecases'
import { type ILoadPayments, type ILoadPaymentsRepository } from '@/core'
import { type Payment } from '@/domain'

const mockPayments = (): Payment[] => ([
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

const mockPaymentRepository = (): ILoadPaymentsRepository => {
  class LoadPaymentRepositoryStub implements ILoadPaymentsRepository {
    async loadAll (): Promise<Payment[]> {
      return await Promise.resolve(mockPayments())
    }
  }
  return new LoadPaymentRepositoryStub()
}

interface SutTypes {
  sut: ILoadPayments
  loadPaymentsRepositoryStub: ILoadPaymentsRepository
}

const mockSut = (): SutTypes => {
  const loadPaymentsRepositoryStub = mockPaymentRepository()
  const sut = new LoadPayments(loadPaymentsRepositoryStub)
  return {
    sut,
    loadPaymentsRepositoryStub
  }
}

describe('LoadPayments', () => {
  test('Should call ILoadPaymentsRepository', async () => {
    const { sut, loadPaymentsRepositoryStub } = mockSut()
    const loadAllSpy = jest.spyOn(loadPaymentsRepositoryStub, 'loadAll')
    await sut.execute({})
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Payments on success', async () => {
    const { sut } = mockSut()
    const payments = await sut.execute({})
    expect(payments).toEqual(mockPayments())
  })

  test('Should throw if ILoadPaymentsRepository throws', async () => {
    const { sut, loadPaymentsRepositoryStub } = mockSut()
    jest.spyOn(loadPaymentsRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute({})
    await expect(promise).rejects.toThrow()
  })
})
