import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

class ImportCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request

        const imporCategoryUseCase = container.resolve(ImportCategoryUseCase)

        await imporCategoryUseCase.execute(file)

        return response.send(201)
    }
}

export { ImportCategoryController }