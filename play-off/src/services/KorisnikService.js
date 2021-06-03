import config from "../config/config"

import axios from "axios"

class KorisnikService {
    static async login(creds) {
        try {
            let res = await axios.post(config.BACKEND_URL + "/korisnik/login", creds)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async register(data) {
        try {
            let res = await axios.post(config.BACKEND_URL + "/korisnik/registracija", data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async uploadSliku(data, conf, korisnik){
        console.log(data)
        try {
            let res = await axios.post(config.BACKEND_URL + "/korisnik/slika/"+korisnik, data, conf)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async usernameSearch(username){
        try {
            let res = await axios.get(config.BACKEND_URL + `/korisnik/username/${username}?cijelo=ne`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async dobaviInfo(id){
        try {
            let res = await axios.get(`${config.BACKEND_URL}/korisnik/${id}`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }
}

export default KorisnikService
