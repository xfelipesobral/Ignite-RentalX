import dayjs from 'dayjs'

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { AppError } from '@shared/errors/AppErrors'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJSDateProvider'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
    const dayAdd24hours = dayjs().add(1, 'day').toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayjsDateProvider = new DayjsDateProvider()

        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider)
    })

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            car_id: '121212',
            user_id: '12345',
            expected_return_date: dayAdd24hours
        })

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not be able to create a new rental if another open to them same user', () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '121212',
                user_id: '12345',
                expected_return_date: dayAdd24hours
            })
            
            await createRentalUseCase.execute({
                car_id: '121212',
                user_id: '12345',
                expected_return_date: dayAdd24hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental if another open to them same car', () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: 'test',
                user_id: '123',
                expected_return_date: dayAdd24hours
            })
            
            await createRentalUseCase.execute({
                car_id: 'test',
                user_id: '321',
                expected_return_date: dayAdd24hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental with invalid return time', () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: 'test',
                user_id: '123',
                expected_return_date: dayjs().toDate()
            })

        }).rejects.toBeInstanceOf(AppError)
    })
})