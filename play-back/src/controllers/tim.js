import {sendResponse} from '../utility'
import {TimData} from '../data'

const dodaj = async (req, res, next) => {
    let tim = {...req.body, dostupnost:false, ELO: 0}
    try {
        let rez = await TimData.dodaj(tim)
        res.data = JSON.stringify(rez)
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError" && error.errors.length > 0){
            res.statusCode = 409
            let razlog = error.errors[0].path
            res.message = `Unešeno polje ${razlog} već postoji.`
        }
        else{
            res.statusCode = 500
            res.message = "Greška u serveru: " + error.message
        }
    }
    sendResponse(req, res)
}

const uploadSliku = async (req, res, next) => {
    try {
        let timID = req.params.timID
        
        await TimData.uploadSliku(timID,req.file.buffer)
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const izmjeni = async (req, res, next) => {
    let id = req.params.timID
    let data = req.body
    try {
        let newTim = await TimData.izmjeni(id, data)
        if(!newTim){
            res.statusCode = 404
            res.message = `Tim sa id ${id} ne postoji.`
        }
        res.data = newTim
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dodajIgraca = async (req, res, next) => {
    try {
        let dodano = await TimData.dodajIgraca(req.body.tim, req.body.korisnik)
        if (!dodano){
            res.statusCode = 409
            res.message = `Igrac sa id ${req.body.korisnik} je vec dodan u tim sa id ${req.body.tim}`
        }
        else
            res.statusCode = 201
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const izbaciIgraca = async (req, res, next) => {
    try {
        let obrisano = await TimData.izbaciIgraca(req.body.tim, req.body.korisnik)
        if (obrisano == 0){
            res.statusCode = 404
            res.message = `Igrac sa id ${req.body.korisnik} nije u timu sa id ${req.body.tim}.`
        }
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviProsle = async (req,res, next) => {
    let korisnikID = req.params.korisnikID
    try {
        let prosliTmovi = await TimData.dobaviProsle(korisnikID)
        res.data = prosliTmovi
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dodajProsli = async (req, res, next) => {
    let prosliTim = req.body
    try {
        await TimData.dodajProsli(prosliTim)
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const clanovi = async (req, res, next) => {
    let timID = req.params.timID
    try {
        let clanovi = await TimData.clanovi(timID)
        res.data = clanovi
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviOsnovane = async (req, res, next) => {
    let korisnikID = req.params.korisnikID
    let term = req.query.term
    let sport = req.query.sport
    try {
        let timovi = await TimData.dobaviOsnovane(korisnikID, term?term:"", sport?sport:null)
        res.data = timovi
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobavi = async (req, res, next) => {
    let kapitenZaIzbaciti=req.query.kapitenZaIzbaciti
    let term = req.query.term
    let sport = req.query.sport
    try {
        let timovi = await TimData.dobavi(term?term:"", sport?sport:null, 
                                kapitenZaIzbaciti?kapitenZaIzbaciti:null)
        res.data = timovi
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const TimCtrl = {
    dodaj,
    izmjeni,
    dodajIgraca,
    izbaciIgraca,
    dobaviProsle,
    dodajProsli,
    clanovi,
    dobaviOsnovane,
    dobavi,
    uploadSliku
}

export default TimCtrl