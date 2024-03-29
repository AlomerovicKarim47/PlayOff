import {Router} from 'express'
import {ZahtjeviCtrl} from '../controllers'

const zahtjeviRoutes = Router()

zahtjeviRoutes.post("/zahtjevi/tim", ZahtjeviCtrl.posaljiZahtjevTim)

zahtjeviRoutes.post("/zahtjevi/mec", ZahtjeviCtrl.posaljiZahtjevMec)

zahtjeviRoutes.get("/zahtjevi/tim/:timID", ZahtjeviCtrl.dobaviZahtjevTim)

zahtjeviRoutes.get("/zahtjevi/mec/:timID", ZahtjeviCtrl.dobaviZahtjevMec)

zahtjeviRoutes.post("/zahtjevi/mecBezTimova", ZahtjeviCtrl.posaljiZahtjevMecBezTimova)

zahtjeviRoutes.get("/zahtjevi/mecBezTimova", ZahtjeviCtrl.dobaviZahtjeveZaMecBezTimova)

zahtjeviRoutes.patch("/zahtjevi/mecBezTimova/:zahtjevID", ZahtjeviCtrl.azurirajZahtjevZaMecBezTimova)

zahtjeviRoutes.get("/zahtjevi/timZaKorisnika/:korisnikID", ZahtjeviCtrl.dobaviKorisnikoveZahtjeveZaTim)

zahtjeviRoutes.patch("/zahtjevi/tim", ZahtjeviCtrl.azurirajZahtjevZaTim)

zahtjeviRoutes.get("/zahtjevi/mecKorisnika/:korisnikID", ZahtjeviCtrl.dobaviKorisnikoveZahtjeveZaMec)

zahtjeviRoutes.patch("/zahtjevi/mec/", ZahtjeviCtrl.azurirajZahtjevZaMec)

zahtjeviRoutes.post('/zahtjevi/pridruzivanje', ZahtjeviCtrl.posaljiZahtjevPridruzivanje)

zahtjeviRoutes.get('/zahtjevi/pridruzivanje', ZahtjeviCtrl.dobaviZahtjeveZaPridruzivanje)

zahtjeviRoutes.patch('/zahtjevi/pridruzivanje/:zahtjevID', ZahtjeviCtrl.azurirajZahtjevZaPridruzivanje)

export default zahtjeviRoutes