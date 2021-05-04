import {sendResponse} from '../utility'
import { PorukeData } from '../data'


const Posalji = async (req, res, next) => {
    let data = req.body
	let poruka = {
        sadrzaj: data.sadrzaj,
        posiljaoc: data.posiljaocID,
        primaoc: data.primaocID,
        vidjenost: false
    }
    try {
        await PorukeData.posaljiPoruku(poruka)
        res.statusCode = 200
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: " + error.message
    }
    sendResponse(req, res)
}

const Dobavi = async (req, res, next) => {
    try {
        let data = await PorukeData.dobaviPoruke(req.params.korisnikID)
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


const PorukeCtrl = {
	Posalji,
	Dobavi
}


export default PorukeCtrl