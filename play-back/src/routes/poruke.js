import {Router} from 'express'
import {PorukeCtrl} from '../controllers'

const porukeRoutes = Router()

porukeRoutes.post("/poruke/posalji", PorukeCtrl.Posalji)

porukeRoutes.get("/poruke/:korisnikID", PorukeCtrl.Dobavi)

export default porukeRoutes