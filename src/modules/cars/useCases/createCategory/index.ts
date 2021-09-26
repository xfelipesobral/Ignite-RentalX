import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import CreateCagoryController from './CreateCategoryController'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export default(): CreateCagoryController => {
    const categoriesRepository = new CategoriesRepository()

    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
    
    const createCategoryController = new CreateCagoryController(createCategoryUseCase)

    return createCategoryController
}