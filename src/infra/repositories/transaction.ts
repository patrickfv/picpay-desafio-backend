import { TransactionRepository } from "../../data/contracts/transaction-repository"
import { TransactionModel } from "../../data/models/transaction-model"
import { DatabaseSync } from 'node:sqlite'

export class SQLiteTransactionRepository implements TransactionRepository {
    constructor(private readonly pathdb='./database.db') {}

    save = (transaction: TransactionModel) => {
        const database = new DatabaseSync(this.pathdb)
        const insert = database.prepare(`
            INSERT INTO transactions (id, value, payee, payer, datetime)
            VALUES (@id, @value, @payee, @payer, @datetime)
            RETURNING id, value, datetime
        `)
        insert.run({
            ...transaction,
            payee: transaction.payee.id,
            payer: transaction.payer.id
        })
    }
}