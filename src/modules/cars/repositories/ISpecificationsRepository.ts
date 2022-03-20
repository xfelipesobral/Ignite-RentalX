import { Specification } from '../infra/typeorm/entities/Specification';

interface ICreateInterfaceDTO {
    name: string,
    description: string
}

interface ISpecificationsRepository {
    create({name, description}: ICreateInterfaceDTO): Promise<Specification>
    findByName(name: string): Promise<Specification>
    findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationsRepository, ICreateInterfaceDTO }