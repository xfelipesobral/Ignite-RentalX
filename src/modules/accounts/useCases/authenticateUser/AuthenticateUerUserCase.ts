import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) { }

    async execute({ email, password }): Promise<IResponse> {
        // Busca usuario pelo email
        const user = await this.userRepository.findByEmail(email)

        // Compara senha
        const passwordMatch = await compare(password, user.password)

        if (!user || !passwordMatch) {
            throw new Error('Email or password incorret')
        }

        // Gera token
        const token = sign({}, '5b8af9e5e961575968f7b58564fdd527b898ca76cf364fe1ca8b3c582753796c', {
            subject: user.id,
            expiresIn: '1d'
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }