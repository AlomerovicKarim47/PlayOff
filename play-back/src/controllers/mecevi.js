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
        vrijemeOdrzavanja: data.vrijemeOdrzavanja,
        mjesto: data.mjesto,
        zavrsen: false,
        rezTim1: null,
        rezTim2: null,
        otkazan: false
    }

    try {
        console.log("dodajMec called")
        await MeceviData.dodajMec(mec)
        console.log("dodajMec inserted")
        res.statusCode = 201
        res.message = "Meč uspješno ubačen."

        // POŠALJI PORUKU KAPITENIMA DA JE MEČ ZAKAZAN

        console.log("dodajMec finished\n")
    } catch (error) {
        console.log("dodajMec failed")
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

        /*
        if (rezultat.otkazan == 0) {
            // Poruka da je meč uspješno završen

        } else {
            // Poruka da je meč otkazan

        }
        */
        res.statusCode = 200
        res.message = `Meč završen sa rezultatom ${rezultat.rezTim1}:${rezultat.rezTim2}.`
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dodajTermin = async (req, res, next) => {
    let data = req.body
    let termin = {
        organizator: data.organizatorID,
        sport: data.sportID,
        vrijemeOdrzavanja: data.vrijemeOdrzavanja,
        mjesto: data.mjesto,
        zavrsen: false,
        otkazan: false,
        mec: data.mec
    }

    try {
        // Dodaj termin i organizatora u termin
        console.log("dodajTermin called")
        let t = await MeceviData.dodajTermin(termin)
        console.log("dodajTermin inserted")
        await MeceviData.dodajKorisnikaTermin({ korisnik: termin.organizator, mec: t.id })
        console.log("dodajKorisnikaTermin inserted")
        res.statusCode = 201
        res.message = "Termin uspješno ubačen."
        res.data = JSON.stringify(t)
        console.log("dodajTermin finished\n")
    } catch (error) {
        console.log("dodajTermin failed")
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviTermin = async (req, res, next) => {
    try {
        let termini = await MeceviData.dobaviTermine(req.params.korisnikID)
        res.data = termini
        res.statusCode = 200
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const zavrsiTermin = async (req, res, next) => {
    let rezultat = req.body
    try {
        await MeceviData.zavrsiTermin(req.params.mecID, rezultat)
        res.statusCode = 200
        res.message = `Termin završen sa rezultatom ${rezultat.rezTim1}:${rezultat.rezTim2}.`
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dodajKorisnikaTermin = async (req, res, next) => {
    try {
        console.log("dodajKorisnikaTermin called")
        await MeceviData.dodajKorisnikaTermin(req.body)
        console.log("dodajKorisnikaTermin inserted")
        res.statusCode = 201
        res.message = "Korisnik uspješno ubačen u termin."
        console.log("dodajKorisnikaTermin finished\n")
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

// DOVRŠITI KADA SE PORUKE URADE
const izbaciKorisnikaTermin = async (req, res, next) => {
    let posiljaocID = req.body.posiljaocID
    let zahtjev = { korisnikID: req.body.korisnikID, mecID: req.body.mecID }

    try {
        let obrisano = await MeceviData.izbaciKorisnikaTermin(zahtjev)
        console.log(obrisano)

        // TODO: OGRANIČENJE DA KORISNIK MOŽE IZBACITI SAMO SEBE AKO NIJE ORGANIZATOR
        // Uradi na frontu pa kasnije ovdje ako se bude imalo vremena

        if (obrisano == 0) {
            res.statusCode = 404
            res.message = `Greška: Igrač sa ID ${zahtjev.korisnikID} nije u terminu sa ID ${zahtjev.mecID}.`
        } else {
            let data = req.body
            /*
            if (data.posiljaocID == data.korisnikID) {
                // POSALJI PORUKU DA JE USPJEŠNO ODJAVLJEN
    
            } else {
                // POSALJI PORUKU DA JE IZBAČEN OD STRANE ORGANIZATORA
    
            }
            */
            res.statusCode = 200
            res.message = `Igrač sa ID ${zahtjev.korisnikID} uspješno izbačen iz termina sa ID ${zahtjev.mecID}.`
        }
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviOrganizovaneTermine = async (req, res, next) => {
    try {
        let korisnik = req.params.korisnikID
        let termini = await MeceviData.dobaviOrganizovaneTermine(korisnik)
        res.data = JSON.stringify(termini)
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
    izbaciKorisnikaTermin,
    dobaviOrganizovaneTermine
}

export default MeceviCtrl
