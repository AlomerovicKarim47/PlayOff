import express from 'express'
import config from './config'
import loaders from './loaders'
import dotenv from 'dotenv'

const startServer = async () => {
    dotenv.config();
    console.log("ENVIRONMENT IS: " + process.env.NODE_ENV);
    const app = express()
    await loaders.loadSequelize()
    loaders.loadExpress(app)
    app.listen(config.PORT)
    
    console.log(`Play-back running on port ${config.PORT}.`)
}

startServer()
