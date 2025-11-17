import { Transfer } from "../../domain/use-case/transfer"
import { User, USER_TYPE } from "../../domain/entities"
import { TransactionModel } from "../models/transaction-model"
import { TransactionRepository } from "../contracts/transaction-repository"

export class TransferService implements Transfer {
    private readonly timenow: number

    constructor(private readonly repository: TransactionRepository) { this.timenow = Date.now() }

    exec = (payer: User, payee: User, value: number) => {
        if (payer.userType == USER_TYPE.shopkeeper) throw Error

        payer.walletValue -= value
        payee.walletValue += value

        const transaction: TransactionModel = {
            datetime: this.timenow,
            payee,
            payer,
            value,
            id: Math.floor(Math.random() * 100)
        }
        this.repository.save(transaction)
        return transaction
    }
}