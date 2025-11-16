import { FindUserRepository } from "../../data/contracts/find-user-repository"
import { DatabaseSync } from 'node:sqlite'
import { UserModel } from "../../data/models/user-model"

export class SQLiteUserRepository implements FindUserRepository {
    constructor(private readonly pathdb='./database.db') {}

    load = (id: number): UserModel => {
        const database = new DatabaseSync(this.pathdb)
        const finder = database.prepare(`SELECT * FROM users WHERE id = @id`)
        return (finder.get({id}) as UserModel)
    }
}
