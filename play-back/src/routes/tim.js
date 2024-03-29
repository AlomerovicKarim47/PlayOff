import {Router} from 'express'
import {TimCtrl} from '../controllers'
import {upload} from '../middleware'

const timRoutes = Router()

timRoutes.post("/tim", TimCtrl.dodaj)

timRoutes.post("/tim/slika/:timID", upload.single("timSlika"), TimCtrl.uploadSliku)

timRoutes.patch("/tim/:timID", TimCtrl.izmjeni)

timRoutes.post("/tim/dodajIgraca", TimCtrl.dodajIgraca)

timRoutes.delete("/tim/izbaciIgraca", TimCtrl.izbaciIgraca)

timRoutes.get("/tim/prosli/:korisnikID", TimCtrl.dobaviProsle)

timRoutes.post("/tim/prosli", TimCtrl.dodajProsli)

timRoutes.get("/tim/clanovi/:timID", TimCtrl.clanovi)

timRoutes.get("/tim/osnovani/:korisnikID", TimCtrl.dobaviOsnovane)

timRoutes.get("/tim", TimCtrl.dobavi)

export default timRoutes