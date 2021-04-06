import {Router} from 'express'
import {KorisnikCtrl} from '../controllers'

const korisnikRoutes = Router()

korisnikRoutes.post('/korisnik/registracija', KorisnikCtrl.registracija)

export default korisnikRoutes
