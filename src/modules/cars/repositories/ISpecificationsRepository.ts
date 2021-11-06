import { Specification } from '../infra/typeorm/entities/Specification';

interface ICreateInterfaceDTO {
    name: string,
    description: string
}

interface ISpecificationsRepository {
    create({name, description}: ICreateInterfaceDTO): Promise<void>
    findByName(name: string): Promise<Specification>
}

export { ISpecificationsRepository, ICreateInterfaceDTO }