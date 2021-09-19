import { Request, Response } from 'express'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

class ImportCategoryController {
    constructor(private imporCategoryUseCase: ImportCategoryUseCase) {
    }

    handle(request: Request, response: Response): Response {
        const { file } = request

        this.imporCategoryUseCase.execute(file)

        return response.send()
    }
}

export { ImportCategoryController }