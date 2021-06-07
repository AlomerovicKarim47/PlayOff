import express from 'express'
import config from './config'
import loaders from './loaders'
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./loaders/swagger_output.json')

const startServer = async () => {
    const app = express()
    await loaders.loadSequelize()
    loaders.loadExpress(app)
    //loaders.loadSwagger(app)
	app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    app.listen(config.PORT)
    
    console.log(`Play-back running on port ${config.PORT}.`)
}

startServer()
