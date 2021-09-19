import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequest {
    name: string
    description: string
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationsRepository) {

    }

    execute({ name, description }: IRequest): void {
        const specifcationAlreadyExists = this.specificationRepository.findByName(name)

        if (specifcationAlreadyExists) {
            throw new Error('Specification already exists!')
        }

        this.specificationRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }