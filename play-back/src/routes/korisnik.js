import {Router} from 'express'
import {KorisnikCtrl} from '../controllers'
import {upload} from '../middleware'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const korisnikRoutes = Router()
/**
 * @swagger
 * /korisnik/registracija:
 *  post:
 *      description: nista
 *      responses:
 *          '201':
 *              description: uspjeh
 */
korisnikRoutes.post('/korisnik/registracija', KorisnikCtrl.registracija)

korisnikRoutes.post('/korisnik/slika/:korisnikID', upload.single("korisnikSlika"), KorisnikCtrl.uploadSliku)

korisnikRoutes.post('/korisnik/login', KorisnikCtrl.login)

korisnikRoutes.get('/korisnik/:korisnikID', KorisnikCtrl.traziPoId)

korisnikRoutes.patch('/korisnik/:korisnikID', KorisnikCtrl.izmjeni)

korisnikRoutes.get('/korisnik/username/:username', KorisnikCtrl.traziPoUsername)

export default korisnikRoutes
