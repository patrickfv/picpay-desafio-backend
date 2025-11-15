import { Transaction, User } from "../entities"

export interface Transfer {
    exec: (payer: User, payee: User, value: number) => Transaction
}