import express, { json, urlencoded } from 'express'
import cors from 'cors'

const loadExpress = (app) => {
    app.use(urlencoded({extended:false}))
    app.use(json())
    app.use(cors())
    console.log("Express loaded.")
}

export default loadExpress