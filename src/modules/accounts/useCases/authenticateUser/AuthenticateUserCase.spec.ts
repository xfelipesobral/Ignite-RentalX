import { AppError } from '@errors/AppErrors'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it('Should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test'
        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty('token')
    })

    // Erro promise (Verificar depois)
    it('Should not be able to authenticate an nonexistente user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '1234'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to authenticate with incorret password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '999123',
                email: 'user@user.com',
                password: '1234',
                name: 'User Test Error'
            }

            await createUserUseCase.execute(user)

            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})