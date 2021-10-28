import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class CreateUserUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepositoru: IUsersRepository
    ){ }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
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