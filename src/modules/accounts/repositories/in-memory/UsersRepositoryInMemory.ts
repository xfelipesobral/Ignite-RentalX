import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/user'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = []

    async create({ driver_license, email, name, password }: ICreateUserDTO): Promise<void> {
        const user = new User()

        Object.assign(user, {
            driver_license, email, name, password
        })

        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email)
        return user
    }
    
    async findById(user_id: string): Promise<User> {
        const user = this.users.find(user => user.id === user_id)
        return user
    }

}

export { UsersRepositoryInMemory }