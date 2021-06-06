import axios from 'axios'
import config from '../config/config'
import UserStore from '../stores/UserStore'

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

    static async posaljiZahtjevZaMec(data){
        try {
            let res = await axios.post(`${config.BACKEND_URL}/zahtjevi/mec`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async dobaviZahtjeveZaMec(){
        try {
            let res = await axios.get(`${config.BACKEND_URL}/zahtjevi/mecKorisnika/${UserStore.user.id}`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async azurirajZahtjevZaMec(data){
        try {
            let res = await axios.patch(`${config.BACKEND_URL}/zahtjevi/mec`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async posaljiZahtjevPridruzivanje(data){
        try {
            let res = await axios.post(`${config.BACKEND_URL}/zahtjevi/pridruzivanje`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async dobaviZahtjevePridruzivanje(korisnik, mec){
        let params = ""
        if (korisnik) params = "?korisnik="+korisnik
        else if (mec) params = "?mec="+mec
        try {
            let res = await axios.get(`${config.BACKEND_URL}/zahtjevi/pridruzivanje${params}`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async azurirajZahtjevPridruzivanje(zahtjevID, data, posiljaoc, mec){
        try {
            let res = await axios.patch(`${config.BACKEND_URL}/zahtjevi/pridruzivanje/${zahtjevID}?posiljaoc=${posiljaoc}&mec=${mec}`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }
}

export default ZahtjevService