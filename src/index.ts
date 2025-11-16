import app, { config } from './main/server'

app.listen(config.port, ()=>{
    console.log(`Server running on port ${config.port}`)
})