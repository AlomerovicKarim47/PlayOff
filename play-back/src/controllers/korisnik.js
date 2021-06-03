import {KorisnikData} from '../data'
import jwt from 'jsonwebtoken'
import config from '../config'
import {sendResponse} from '../utility'

const registracija = async (req, res, next) => {
    let korisnik = {...req.body, dosupnost:false, rank:0}
    try {    
        await KorisnikData.dodaj(korisnik)
        res.statusCode = 201 
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError" && error.errors.length > 0){
            res.statusCode = 409
            let razlog = error.errors[0].path
            res.message = `Unešeno polje ${razlog} već postoji.`
        }
        else{
            res.statusCode = 500
            res.message = "Greška u serveru: "+ error.message
        }
    }
    sendResponse(req, res)
}

const uploadSliku = async (req, res, next) => {
    try {
        let korisnikID = req.params.korisnikID
        await KorisnikData.uploadSliku(korisnikID, req.file.buffer)
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: "+ error.message
    }
    sendResponse(req, res)
}

const login = async (req, res, next) => {
    let creds = req.body
    try {
        let korisnik = await KorisnikData.provjeriLogin(creds)
        if (!korisnik){
            res.statusCode = 401
            res.message = "Neautorizovano. Username ili password pogrešni."
            sendResponse(req, res)
            return
        }
        delete korisnik.password
        let token = jwt.sign(korisnik, config.JWT_SECRET_KEY)
        res.data = {
            token,
            korisnik
        }
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: "+ error.message
    }
    sendResponse(req, res)
}

const traziPoId = async (req, res, next) => {
    let id = req.params.korisnikID
    try {
        let korisnik = await KorisnikData.traziPoId(id)
        if (!korisnik){
            res.statusCode = 404
            res.message = `Ne postoji korisnik sa id: ${id}`
            sendResponse(req, res)
            return
        }
        delete korisnik.password
        res.data = korisnik
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: "+ error.message
    }
    sendResponse(req, res)
}

const izmjeni = async (req, res, next) => {
    let id = req.params.korisnikID
    let data = req.body
    delete data.id
    try {
        let noviKorisnik = await KorisnikData.izmjeni(id, data)
        if (!noviKorisnik){
            res.statusCode = 404,
            res.message = `Ne postoji korisnik sa id: ${id}`
            sendResponse(req, res)
            return
        }
        res.data = noviKorisnik
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: "+ error.message
    }
    sendResponse(req, res)
}

const traziPoUsername = async (req, res, next) => {
    let username = req.params.username
    let cijelo = req.query.cijelo==="da"?true:false
    try {
        let korisnici = await KorisnikData.traziPoUsername(username, cijelo)
        res.data = JSON.stringify(korisnici)
    } catch (error) {
        res.statusCode = 500
        res.message = "Greška u serveru: "+ error.message
    }
    sendResponse(req, res)
}

const KorisnikCtrl = {
    registracija,
    login,
    traziPoId,
    izmjeni,
    traziPoUsername,
    uploadSliku
}

export default KorisnikCtrl