import app, { config } from './app'

app.listen(config.port, ()=>{
    console.log(`Server running on port ${config.port}`)
})