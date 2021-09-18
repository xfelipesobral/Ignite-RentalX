import { Router } from 'express'

import { CategoriesRepository } from '../repositories/CategoriesRepository'
import { PostgresCategoriesRepository } from '../repositories/PostgresCategoriesRepository'

import { CreateCategoryService } from '../services/CreateCategoryService'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository() // PostgresCategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body

    const createCategoryService = new CreateCategoryService(categoriesRepository)

    try {
        createCategoryService.execute({ name, description })
    } catch (error) {
        return response.status(400).json(error)
    }

    return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {

    const categories = categoriesRepository.list()
    return response.status(201).json(categories)
})

export { categoriesRoutes }