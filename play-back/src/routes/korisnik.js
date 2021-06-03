import {Router} from 'express'
import {KorisnikCtrl} from '../controllers'
import {upload} from '../middleware'

const korisnikRoutes = Router()

korisnikRoutes.post('/korisnik/registracija', KorisnikCtrl.registracija)

korisnikRoutes.post('/korisnik/slika/:korisnikID', upload.single("korisnikSlika"), KorisnikCtrl.uploadSliku)

korisnikRoutes.post('/korisnik/login', KorisnikCtrl.login)

korisnikRoutes.get('/korisnik/:korisnikID', KorisnikCtrl.traziPoId)

korisnikRoutes.patch('/korisnik/:korisnikID', KorisnikCtrl.izmjeni)

korisnikRoutes.get('/korisnik/username/:username', KorisnikCtrl.traziPoUsername)

export default korisnikRoutes
