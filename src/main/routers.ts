import express, { Router } from 'express'
import { transferController } from './controller/transfer-controller'

const routers = Router()

routers.post('/transfer',transferController)

export default routers