import { type Payment } from '@/domain'
import { AddPayment } from '@/usecases'
import { type IAddPaymentRepository } from '@/core'

const mockPayment = (): Payment => ({
  amount: 1000,
  status: 'any_status',
  orderId: 'any_orderId'
})

interface SutTypes {
  sut: AddPayment
  addPaymentRepositoryStub: IAddPaymentRepository
}

const mockAddPaymentRepository = (): IAddPaymentRepository => {
  class AddPaymentRepositoryStub implements IAddPaymentRepository {
    async add (params: Payment): Promise<void> {
      return await Promise.resolve()
    }
  }
  const addPaymentRepositoryStub = new AddPaymentRepositoryStub()
  return addPaymentRepositoryStub
}

const mockSut = (): SutTypes => {
  const addPaymentRepositoryStub = mockAddPaymentRepository()
  const sut = new AddPayment(addPaymentRepositoryStub)
  return {
    sut,
    addPaymentRepositoryStub
  }
}

describe('AddPayment Usecase', () => {
  test('Should call IAddPaymentRepository usign correct values', async () => {
    const { sut, addPaymentRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addPaymentRepositoryStub, 'add')
    const addPaymentData = mockPayment()
    await sut.execute(addPaymentData)
    expect(addSpy).toHaveBeenCalledWith(addPaymentData)
  })

  test('Shoud throw Error if repository throws', async () => {
    const { sut, addPaymentRepositoryStub } = mockSut()
    jest.spyOn(addPaymentRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.execute(mockPayment())
    await expect(promise).rejects.toThrow()
  })
})
