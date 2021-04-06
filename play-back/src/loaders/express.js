import express, { json, urlencoded } from 'express'
import cors from 'cors'
import routes from '../routes'
import { response } from '../middleware'

const loadExpress = (app) => {
    app.use(urlencoded({extended:false}))
    app.use(json())
    app.use(cors())
    app.use(routes)
    app.use(response)
    console.log("Express loaded.")
}

export default loadExpress