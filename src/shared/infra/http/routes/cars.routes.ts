import { Router } from 'express'
import multer from 'multer'

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { CreateCarSpecificationsController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

import uploadConfig from '@config/upload'

const carsRouter = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationsController = new CreateCarSpecificationsController()
const uploadCarImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRouter.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRouter.get('/available', listAvailableCarsController.handle)
carsRouter.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationsController.handle)
carsRouter.post('/images', ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarImagesController.handle)

export { carsRouter }