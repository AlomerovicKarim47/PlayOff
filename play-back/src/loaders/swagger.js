//import swaggerJsDoc from 'swagger-jsdoc'
//import swaggerUi from 'swagger-ui-express'
//import config from '../config'



const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['G:/NBPSranje/PlayOff/play-back/src/routes/korisnik.js','G:/NBPSranje/PlayOff/play-back/src/routes/index.js','G:/NBPSranje/PlayOff/play-back/src/routes/mecevi.js','G:/NBPSranje/PlayOff/play-back/src/routes/poruke.js','G:/NBPSranje/PlayOff/play-back/src/routes/pozicije.js','G:/NBPSranje/PlayOff/play-back/src/routes/tim.js','G:/NBPSranje/PlayOff/play-back/src/routes/zahtjevi.js']

swaggerAutogen(outputFile, endpointsFiles)


