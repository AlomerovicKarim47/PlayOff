import { json, urlencoded } from 'express'
import cors from 'cors'
import routes from '../routes'
import config from '../config'

const loadExpress = (app) => {
    app.use(json({limit:'100mb'}))
    app.use(urlencoded({extended:false, limit:'100mb'}))
    
    app.use(cors({
        origin: config.allowedOrigin
    }))
    app.use(routes)
    
    console.log("Express loaded.")
}

export default loadExpress