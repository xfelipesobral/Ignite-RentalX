import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { AppError } from '@errors/AppErrors'

@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepositoru: IUsersRepository
    ){ }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepositoru.findByEmail(email)

        if (userAlreadyExists) {
            throw new AppError('User already exists')
        }

        const passwordHash = await hash(password, 8)

        await this.usersRepositoru.create({ 
            name,
            email,
            password: passwordHash,
            driver_license 
         })
    }

}

export { CreateUserUseCase }