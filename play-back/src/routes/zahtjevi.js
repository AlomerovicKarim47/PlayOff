import {Router} from 'express'
import {ZahtjeviCtrl} from '../controllers'

const zahtjeviRoutes = Router()

zahtjeviRoutes.post("/zahtjevi/tim", ZahtjeviCtrl.posaljiZahtjevTim)

zahtjeviRoutes.post("/zahtjevi/mec", ZahtjeviCtrl.posaljiZahtjevMec)

zahtjeviRoutes.get("/zahtjevi/tim/:timID", ZahtjeviCtrl.dobaviZahtjevTim)

zahtjeviRoutes.get("/zahtjevi/mec/:timID", ZahtjeviCtrl.dobaviZahtjevMec)

export default zahtjeviRoutes