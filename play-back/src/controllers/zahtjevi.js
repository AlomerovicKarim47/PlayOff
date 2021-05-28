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
		status: false
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
        console.log(id, data)
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


const ZahtjeviCtrl = {
	posaljiZahtjevTim,
	dobaviZahtjevMec,
	posaljiZahtjevMecBezTimova,
	posaljiZahtjevMec,
	dobaviZahtjevTim,
    dobaviZahtjeveZaMecBezTimova,
    azurirajZahtjevZaMecBezTimova,
    dobaviKorisnikoveZahtjeveZaTim,
    azurirajZahtjevZaTim
}

export default ZahtjeviCtrl