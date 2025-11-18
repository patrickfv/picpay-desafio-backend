import { Router } from 'express'

const routers = Router()

routers.get('/transfer', (req, res) => { res.json({ status: 200 })})

export default routers