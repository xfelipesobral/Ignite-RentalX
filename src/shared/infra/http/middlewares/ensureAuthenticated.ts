import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '../../../errors/AppErrors'
import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'

interface IPayload {
    sub: string
}

async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('Token missing!', 401)
    }

    // Bearer token
    const [, token] = authHeader.split(' ')
    
    try {
        const { sub: user_id } = verify(token, '5b8af9e5e961575968f7b58564fdd527b898ca76cf364fe1ca8b3c582753796c') as IPayload
        
        const usersRepository = new UsersRepository()
        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User does not exists!', 401)
        }

        request.user = { 
            id: user_id
        }

        next()
    } catch {
        throw new AppError('Invalid token!', 401)
    }

}

export { ensureAuthenticated }