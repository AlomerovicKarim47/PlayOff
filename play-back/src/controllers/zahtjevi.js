import {sendResponse} from '../utility'
import { MeceviData, TimData, ZahtjeviData } from '../data'

const posaljiZahtjevTim = async (req, res, next) => {
    let data = req.body
	let zahtjev = {
        sadrzaj: data.sadrzaj,
		vidjenost: false,
        posiljaoc: data.posiljaocID,
        primaoc: data.primaocID,
		tim: data.timID
    }
    try {
        await ZahtjeviData.posaljiZahtjevTim(zahtjev)
        res.statusCode = 200
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const posaljiZahtjevMec = async (req, res, next) => {
    let data = req.body
	let zahtjev = {
        sadrzaj: data.sadrzaj,
        timPosiljaoc: data.posiljaocID,
        timPrimaoc: data.primaocID,
		vidjenost: false,
		vrijemeOdrzavanja: data.vrijeme,
		mjesto: data.mjesto,
		status: null,
        sport:data.sportID
    }
    try {
        await ZahtjeviData.posaljiZahtjevMec(zahtjev)
        res.statusCode = 200
		
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const posaljiZahtjevMecBezTimova = async (req, res, next) => {
    let data = req.body
	let zahtjev = {
		primaoc: data.primaoc,
        posiljaoc: data.posiljaoc,
		vidjenost: false,
		vrijemeOdrzavanja: data.vrijemeOdrzavanja,
		mjesto: data.mjesto,
		status: null,
        sport: data.sport,
        mec: data.mec
    }
    try {
        await ZahtjeviData.posaljiZahtjevMecBezTimova(zahtjev)
        res.statusCode = 200
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviZahtjevTim = async (req, res, next) => {
	
    try {
        let data = await ZahtjeviData.dobaviZahtjeveZaTim(req.params.timID)
        if(!data) res.statusCode = 404, res.message = "Zahtjev nije pronađen"	
		else{
			res.data = data
			res.statusCode = 200
		}
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviZahtjevMec = async (req, res, next) => {
	
    try {
        let data = await ZahtjeviData.dobaviZahtjeveZaMec(req.params.timID)
        if(!data) res.statusCode = 404, res.message = "Zahtjev nije pronađen"	
		else{
			res.data = data
			res.statusCode = 200
		}
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviZahtjeveZaMecBezTimova = async (req, res, next) => {
    try {
        let korisnik = req.query.korisnik
        let mec = req.query.mec
        let rez = await ZahtjeviData.dobaviZahtjeveZaMecBezTimova(korisnik, mec)
        res.data = JSON.stringify(rez)
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const azurirajZahtjevZaMecBezTimova = async(req, res, next) => {
    try {
        let data = req.body
        let id = req.params.zahtjevID
        let primaoc = req.query.primaoc
        let mec = req.query.mec
        await ZahtjeviData.azurirajZahtjevZaMecBezTimova(id, data)
        if (data.status === true)
            await MeceviData.dodajKorisnikaTermin({korisnik: primaoc, mec: mec})

    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviKorisnikoveZahtjeveZaTim = async (req, res, next) => {
    try {
        let korisnik = req.params.korisnikID
        let zahtjevi = await ZahtjeviData.dobaviKorisnikoveZahtjeveZaTim(korisnik)
        res.data = zahtjevi
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const azurirajZahtjevZaTim = async (req, res, next)=>{
    try {
        let data = req.body
        await ZahtjeviData.azurirajZahtjevZaTim(data.id, {status:data.status})
        if (data.status === true)
            await TimData.dodajIgraca(data.tim, data.primaoc)
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviKorisnikoveZahtjeveZaMec = async (req, res, next) => {
    try {
        let korisnik = req.params.korisnikID
        let zahtjevi = await ZahtjeviData.dobaviKorisnikoveZahtjeveZaMec(korisnik)
        res.data = zahtjevi
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const azurirajZahtjevZaMec = async (req, res, next) => {
    try {
        let data = req.body
        await ZahtjeviData.azurirajZahtjevZaTim(data)
        if (data.status === true){
            let mec = {
                tim1: data.timPosiljaoc,
                tim2: data.timPrimaoc,
                sport: data.sport,
                vrijemeOdrzavanja: data.vrijemeOdrzavanja,
                mjesto: data.mjesto,
                otkazan:false,
                zavrsen:false
            }
            await MeceviData.dodajMec(mec)
        }
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const posaljiZahtjevPridruzivanje = async (req, res, next) => {
    try {
        let zahtjev = {
            ...req.body,
            vidjenost: false
        }
        await ZahtjeviData.posaljiZahtjevPridruzivanje(zahtjev)
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviZahtjeveZaPridruzivanje = async (req, res, next) => {
    try {
        let zahtjevi = await ZahtjeviData.dobaviZahtjeveZaPridruzivanje(req.query.korisnik, req.query.mec)
        res.data = zahtjevi
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const azurirajZahtjevZaPridruzivanje = async (req, res, next) => {
    try {
        let data = req.body
        let id = req.params.zahtjevID
        let posiljaoc = req.query.posiljaoc
        let mec = req.query.mec
        await ZahtjeviData.azurirajZahtjevZaPridruzivanje(id, data)
        if (data.status === true){
            await MeceviData.dodajKorisnikaTermin({korisnik: posiljaoc, mec: mec})
        }
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const ZahtjeviCtrl = {
	posaljiZahtjevTim,
	dobaviZahtjevMec,
	posaljiZahtjevMecBezTimova,
	posaljiZahtjevMec,
	dobaviZahtjevTim,
    dobaviZahtjeveZaMecBezTimova,
    azurirajZahtjevZaMecBezTimova,
    dobaviKorisnikoveZahtjeveZaTim,
    azurirajZahtjevZaTim,
    dobaviKorisnikoveZahtjeveZaMec,
    azurirajZahtjevZaMec,
    posaljiZahtjevPridruzivanje,
    dobaviZahtjeveZaPridruzivanje,
    azurirajZahtjevZaPridruzivanje
}

export default ZahtjeviCtrl