import {Router} from 'express'
import {PorukeCtrl} from '../controllers'

const porukeRoutes = Router()

porukeRoutes.post("/poruka/posalji", PorukeCtrl.Posalji)

porukeRoutes.get("/poruka/:korisnikID", PorukeCtrl.Dobavi)

export default porukeRoutes