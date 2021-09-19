import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'
import CreateCagoryController from './CreateCategoryController'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

const categoriesRepository = CategoriesRepository.getInstance()

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

const createCategoryController = new CreateCagoryController(createCategoryUseCase)

export { createCategoryController }