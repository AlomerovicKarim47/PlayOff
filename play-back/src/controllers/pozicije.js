import {sendResponse} from '../utility'
import { PozicijeData } from '../data'

const postaviPozicije = async (req, res, next) => {
    let data = req.body
	let poz = {
        tim: data.tim,
        korisnik: data.korisnik,
        pozicija: data.pozicija
    }
    try {
        await PozicijeData.postaviPozicije(pozicija)
        res.statusCode = 200
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const dobaviPozicije = async (req, res, next) => {
    try {
        let data = await PozicijeData.dobaviPozicije(req.params.korisnikID)
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


const PozicijeCtrl = {
	dobaviPozicije,
	postaviPozicije
}

export default PozicijeCtrl