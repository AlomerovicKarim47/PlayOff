import { json, urlencoded } from 'express'
import cors from 'cors'
import routes from '../routes'

const loadExpress = (app) => {
    app.use(urlencoded({extended:false}))
    app.use(json())
    app.use(cors())
    app.use(routes)
    console.log("Express loaded.")
}

export default loadExpress