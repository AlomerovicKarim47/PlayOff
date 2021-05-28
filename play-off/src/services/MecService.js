import axios from 'axios'
import config from '../config/config'

class MecService{
    static async kreirajMecBezTimova(data){
        try {
            let res = await axios.post(`${config.BACKEND_URL}/mecevi/dodajTermin`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }
    //U kojima ucestvuje (termin = mec bez timova)
    static async dobaviTermineKorisnika(korisnik){
        try {
            let res = await axios.get(`${config.BACKEND_URL}/mecevi/dobaviTermine/${korisnik}`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async dobaviOrganizovaneTermineKorisnika(korisnik){
        try{
            let res = await axios.get(`${config.BACKEND_URL}/mecevi/dobaviOrganizovaneTermine/${korisnik}`)
            return res.data
        }catch(error){
            return error.response.data
        }
    }

    /*static async dodajKorisnikaUTermin(data){
        try {
            let res = await axios.post(`${config.BACKEND_URL}/mecevi/dodajKorisnikaTermin`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }*/
}

export default MecService