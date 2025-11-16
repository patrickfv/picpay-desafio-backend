import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

type Config = {
    port: number;
    nodeEnv: string;
}

export const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
}

const app = express()

app.use(express.json())
app.get('/', (req, res) => { res.json({ status: 200 }) })

export default app