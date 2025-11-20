import { TransactionRepository } from "../../data/contracts/transaction-repository"
import { TransactionModel } from "../../data/models/transaction-model"
import { DatabaseSync } from 'node:sqlite'

export class SQLiteTransactionRepository implements TransactionRepository {
    constructor(private readonly pathdb='./database.db') {}

    save = (transaction: TransactionModel) => {
        const database = new DatabaseSync(this.pathdb)
        try {
            const insert = database.prepare(`
                INSERT INTO transactions (value, payee, payer, datetime)
                VALUES (@value, @payee, @payer, @datetime)
                RETURNING id, value, datetime
            `)
            insert.run({
                datetime: transaction.datetime,
                value: transaction.value,
                payee: transaction.payee.id,
                payer: transaction.payer.id
            })
        } catch(err) {
            console.log(err)
        }
    }
}