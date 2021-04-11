import { Router } from 'express'
import { MeceviCtrl } from '../controllers'

const meceviRoutes = Router()

meceviRoutes.get('/mecevi/dobaviKorisnik/:korisnikID', MeceviCtrl.dobaviMecKorisnik)
meceviRoutes.get('/mecevi/dobaviTim/:timID', MeceviCtrl.dobaviMecTim)
meceviRoutes.post('/mecevi/dodajMec', MeceviCtrl.dodajMec)
meceviRoutes.patch('/mecevi/zavrsiMec/:mecID', MeceviCtrl.zavrsiMec)
meceviRoutes.post('/mecevi/dodajTermin', MeceviCtrl.dodajTermin)
meceviRoutes.get('/mecevi/dobaviTermine/:korisnikID', MeceviCtrl.dobaviTermin)
meceviRoutes.patch('/mecevi/zavrsiTermin/:mecID', MeceviCtrl.zavrsiTermin)
meceviRoutes.post('/mecevi/dodajKorisnikaTermin', MeceviCtrl.dodajKorisnikaTermin)
meceviRoutes.post('/mecevi/izbaciKorisnikaTermin', MeceviCtrl.izbaciKorisnikaTermin)

export default meceviRoutes
