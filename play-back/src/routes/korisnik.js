import {Router} from 'express'
import {KorisnikCtrl} from '../controllers'

const korisnikRoutes = Router()

korisnikRoutes.post('/korisnik/registracija', KorisnikCtrl.registracija)

korisnikRoutes.post('/korisnik/login', KorisnikCtrl.login)

korisnikRoutes.get('/korisnik/:korisnikID', KorisnikCtrl.traziPoId)

korisnikRoutes.patch('/korisnik/:korisnikID', KorisnikCtrl.izmjeni)

export default korisnikRoutes
