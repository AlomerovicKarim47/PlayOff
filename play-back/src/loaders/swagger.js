//import swaggerJsDoc from 'swagger-jsdoc'
//import swaggerUi from 'swagger-ui-express'
//import config from '../config'



const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
    '../routes/korisnik.js',
    '../routes/index.js',
    '../routes/mecevi.js',
    '../routes/poruke.js',
    '../routes/pozicije.js',
    '../routes/tim.js',
    '../routes/zahtjevi.js']

swaggerAutogen(outputFile, endpointsFiles)


