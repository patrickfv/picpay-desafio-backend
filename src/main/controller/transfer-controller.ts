import { Request, Response } from 'express'
import { TransferService, FindUserService } from '../../data/services'
import { SQLiteTransactionRepository, SQLiteUserRepository } from '../../infra/repositories'
import { getAuthorization } from '../service/authorization'

export const transferController = async (req: Request, res: Response) => {
    const authorization = await getAuthorization()
    if (!authorization) {
        res.json({ value: 'Not Authorized' })
        return
    }
    
    const {payee, payer, value} = req.body

    const transferService = new TransferService(new SQLiteTransactionRepository())
    const findUserService = new FindUserService(new SQLiteUserRepository())
    const userpayee = findUserService.findById(payee)
    const userpayer = findUserService.findById(payer)
    const transaction = transferService.exec(userpayer, userpayee, value)

    res.json({ value: transaction })
}