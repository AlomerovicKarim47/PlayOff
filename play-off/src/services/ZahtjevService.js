import axios from 'axios'
import config from '../config/config'

class ZahtjevService{
    static async posaljiZahtjevZaMecBezTimova(data){
        try {
            let res = await axios.post(`${config.BACKEND_URL}/zahtjevi/mecBezTimova`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }
    static async dobaviZahtjeveZaMecBezTimova(korisnik, mec){
        try {
            let param = ""
            if (korisnik) param = `?korisnik=${korisnik}`
            else if (mec) param = `?mec=${mec}`
            let res = await axios.get(`${config.BACKEND_URL}/zahtjevi/mecBezTimova${param}`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }
    static async prihvatiZahtjevZaMecBezTimova(zahtjev, primaoc, mec){
        let data = {status:true}
        try {
            let res = await axios.patch(`${config.BACKEND_URL}/zahtjevi/mecBezTimova/${zahtjev}?primaoc=${primaoc}&mec=${mec}`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async odbijZahtjevZaMecBezTimova(zahtjev){
        let data = {status:false}
        try {
            let res = await axios.patch(`${config.BACKEND_URL}/zahtjevi/mecBezTimova/${zahtjev}`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async posaljiZahtjevZaClanstvo(zahtjev){
        try {
            let res = await axios.post(`${config.BACKEND_URL}/zahtjevi/tim`, zahtjev)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async dobaviZahtjeveZaClanstvoTima(tim){
        try {
            let res = await axios.get(`${config.BACKEND_URL}/zahtjevi/tim/${tim}`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async dobaviKorisnikoveZahtjeveZaTim(korisnik){
        try {
            let res = await axios.get(`${config.BACKEND_URL}/zahtjevi/timZaKorisnika/${korisnik}`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async azurirajZahtjevZaTim(data){
        try {
            let res = await axios.patch(`${config.BACKEND_URL}/zahtjevi/tim`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }
}

export default ZahtjevService