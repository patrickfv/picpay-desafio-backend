import { TransactionModel } from '../models/transaction-model'

export interface TransactionRepository { save: (transaction: TransactionModel) => void }