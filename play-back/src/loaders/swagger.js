import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import config from '../config'

const loadSwagger = (app) => {
    const swaggerOptions = {
        swaggerDefinition:{
            info:{
                title:"PlayOff API",
                description: "API za aplikaciju PlayOff",
                servers:[`http://localhost:${config.PORT}`]
            }
        },
        apis: ['../routes/korisnik.js']
    }

    const swaggerDocs = swaggerJsDoc(swaggerOptions)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

export default loadSwagger