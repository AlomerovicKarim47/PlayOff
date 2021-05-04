import {Router} from 'express'
import {PozicijeCtrl} from '../controllers'

const pozicijeRoutes = Router()

pozicijeRoutes.get("/pozicija/preferirane/:korisnikID", PozicijeCtrl.dobaviPozicije)

pozicijeRoutes.post("/pozicija/postaviKorisnika", PorukeCtrl.postaviPozicije)


export default pozicijeRoutes