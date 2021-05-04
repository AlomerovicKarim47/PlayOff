import {Router} from 'express'
import {ZahtjeviCtrl} from '../controllers'

const zahtjeviRoutes = Router()

zahtjeviRoutes.post("/zahtjevi/tim", ZahtjeviCtrl.PosaljiZahtjevTim)

zahtjeviRoutes.post("/zahtjevi/mec", ZahtjeviCtrl.PosaljiZahtjevMec)

zahtjeviRoutes.get("/zahtjevi/tim/:timID", ZahtjeviCtrl.dobaviZahtjeveZaTim)

zahtjeviRoutes.get("/zahtjevi/mec/:timID", ZahtjeviCtrl.dobaviZahtjevMec)

export default zahtjeviRoutes