import { sendResponse } from '../utility'
import { MeceviData } from '../data'

// DONE
const dobaviMecKorisnik = async (req, res, next) => {
    try {
        let mecevi = await MeceviData.dobaviMecKorisnik(req.params.korisnikID)
        res.data = mecevi
        res.statusCode = 200
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

// DONE
const dobaviMecTim = async (req, res, next) => {
    try {
        let mecevi = await MeceviData.dobaviMecTim(req.params.timID)
        res.data = mecevi
        res.statusCode = 200
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

// DOVRŠITI NAKON IMPLEMENTACIJE PORUKA
const dodajMec = async (req, res, next) => {
    let data = req.body
    let mec = {
        tim1: data.tim1ID,
        tim2: data.tim2ID,
        sport: data.sportID,
        vrijemeOdrzavanja: data.vrijeme,
        mjesto: data.mjesto,
        zavrsen: false,
        rezTim1: null,
        rezTim2: null,
        otkazan: false
    }

    try {
        await MeceviData.dodajMec(mec)

        // POŠALJI PORUKU KAPITENIMA DA JE MEČ ZAKAZAN

    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError" && error.errors.length > 0) {
            res.statusCode = 409
            let razlog = error.errors[0].path
            res.message = `Unešeno polje ${razlog} već postoji.`
        }
        else {
            res.statusCode = 500
            res.message = "Greška u serveru: " + error.message
        }
    }
    sendResponse(req, res)
}

// DOVRŠITI NAKON IMPLEMENTACIJE PORUKA
const zavrsiMec = async (req, res, next) => {
    let rezultat = req.body
    try {
        await MeceviData.zavrsiMec(req.params.mecID, rezultat)
        res.statusCode = 200

        /*
        if (rezultat.otkazan == 0) {
            // Poruka da je meč uspješno završen

        } else {
            // Poruka da je meč otkazan

        }
        */
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

// DONE
const dodajTermin = async (req, res, next) => {
    let data = req.body
    let termin = {
        organizator: data.organizatorID,
        sport: data.sportID,
        vrijemeOdrzavanja: data.vrijeme,
        mjesto: data.mjesto,
        zavrsen: false,
        otkazan: false
    }

    try {
        // Dodaj termin i organizatora u termin
        let terminID = await MeceviData.dodajTermin(termin)
        await MeceviData.dodajKorisnikaTermin({ korisnik: termin.organizator, mec: terminID })
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

// DONE
const dobaviTermin = async (req, res, next) => {
    try {
        let termini = await MeceviData.dobaviTermin(req.params.korisnikID)
        res.data = termini
        res.statusCode = 200
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

// DONE
const zavrsiTermin = async (req, res, next) => {
    let rezultat = req.body
    try {
        await MeceviData.zavrsiTermin(req.params.mecID, rezultat)
        res.statusCode = 200
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

// DONE
const dodajKorisnikaTermin = async (req, res, next) => {
    try {
        await MeceviData.dodajKorisnikaTermin(req.body)
        res.statusCode = 201
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

// DOVRŠITI KADA SE PORUKE URADE
const izbaciKorisnikaTermin = async (req, res, next) => {
    try {
        let obrisano = await MeceviData.izbaciKorisnikaTermin(req.body)

        if (obrisano == 0) {
            res.statusCode = 404
            res.message = `Igrac sa id ${req.body.korisnik} nije u timu sa id ${req.body.tim}.`
        } else {
            let data = req.body
            /*
            if (data.posiljaocID == data.korisnikID) {
                // POSALJI PORUKU DA JE USPJEŠNO ODJAVLJEN
    
            } else {
                // POSALJI PORUKU DA JE IZBAČEN OD STRANE ORGANIZATORA
    
            }
            */
        }
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const MeceviCtrl = {
    dobaviMecKorisnik,
    dobaviMecTim,
    dodajMec,
    zavrsiMec,
    dodajTermin,
    dobaviTermin,
    zavrsiTermin,
    dodajKorisnikaTermin,
    izbaciKorisnikaTermin
}

export default MeceviCtrl
