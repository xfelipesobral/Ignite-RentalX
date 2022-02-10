import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })

    it('Should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'car_brand',
            name: 'car_name',
            description: 'car_description',
            daily_rate: 110,
            license_plate: 'car_plate',
            fine_amount: 40,
            category_id: 'category_id'
        })

        const cars = await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual([car])
    })

    it('Should be able to list all available cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'car_brand_test',
            name: 'car_name_2',
            description: 'car_description',
            daily_rate: 110,
            license_plate: 'car_plate',
            fine_amount: 40,
            category_id: 'category_id'
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: 'car_brand_test'
        })

        expect(cars).toEqual([car])
    })

    it('Should be able to list all available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'car_brand_test',
            name: 'car_name_3',
            description: 'car_description',
            daily_rate: 110,
            license_plate: 'car_plate',
            fine_amount: 40,
            category_id: 'category_id'
        })

        const cars = await listAvailableCarsUseCase.execute({
            name: 'car_name_3'
        })

        expect(cars).toEqual([car])
    })

    it('Should be able to list all available cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'car_brand_test',
            name: 'car_name_4',
            description: 'car_description',
            daily_rate: 110,
            license_plate: 'car_plate',
            fine_amount: 40,
            category_id: '12345'
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id: '12345'
        })

        expect(cars).toEqual([car])
    })
})