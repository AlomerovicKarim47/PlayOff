import {sendResponse} from '../utility'
import { ZahtjeviData } from '../data'

const posaljiZahtjevTim = async (req, res, next) => {
    let data = req.body
	let zahtjev = {
        sadrzaj: data.sadrzaj,
        posiljaoc: data.posiljaocUsername,
        primaoc: data.primaocUsername,
        vidjenost: false,
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
        posiljaoc: data.posiljaocID,
        primaoc: data.primaocID,
		vrijeme: data.vrijeme,
		mjesto: data.mjesto
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
		korisnik: data.korisnikID
		vidjenost: false
		vrijemeOdrzavanja: data.vrijeme,
		mjesto: data.mjesto,
		status: false
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
        if(!data) res.statusCode = 404	
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
        if(!data) res.statusCode = 404	
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


const ZahtjeviCtrl = {
	posaljiZahtjevTim,
	dobaviZahtjevMec,
	posaljiZahtjevMecBezTimova,
	posaljiZahtjevMec,
	dobaviZahtjevTim
}

export default ZahtjeviCtrl