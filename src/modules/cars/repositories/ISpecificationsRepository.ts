import { Specification } from '../models/Specification';

interface ICreateInterfaceDTO {
    name: string,
    description: string
}

interface ISpecificationsRepository {
    create({name, description}: ICreateInterfaceDTO): void
    findByName(name: string): Specification
}

export { ISpecificationsRepository, ICreateInterfaceDTO }