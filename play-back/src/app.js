import express from 'express'
import config from './config'
import loaders from './loaders'

const startServer = async () => {
    const app = express()
    await loaders.loadSequelize()
    loaders.loadExpress(app)
    loaders.loadSwagger(app)
    app.listen(config.PORT)
    
    console.log(`Play-back running on port ${config.PORT}.`)
}

startServer()
