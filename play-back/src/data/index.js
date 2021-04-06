import KorisnikData from './korsinik'
import MeceviData from './mecevi'
import ZahtjeviData from './zahtjevi'
import PozicijeData from './pozicije'
import PorukeData from './poruke'
import TimData from './tim'

const postaviBazu = (database) => {
    KorisnikData.postaviBazu(database)
    MeceviData.postaviBazu(database)
    ZahtjeviData.postaviBazu(database)
    PozicijeData.postaviBazu(database)
    PorukeData.postaviBazu(database)
    TimData.postaviBazu(database)
}

export {
    postaviBazu,
    KorisnikData,
    MeceviData,
    ZahtjeviData,
    PozicijeData,
    PorukeData,
    TimData
}