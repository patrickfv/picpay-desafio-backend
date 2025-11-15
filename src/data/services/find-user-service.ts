import {FindUser} from '../../domain/use-case/find-user'
import { FindUserRepository } from '../contracts/find-user-repository'

export class FindUserService implements FindUser {
    constructor(private readonly repository: FindUserRepository) {}

    findById = (id: number) => this.repository.load(id)
}